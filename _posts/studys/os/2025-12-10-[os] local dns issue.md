```yaml
layout: blog
study: true
use_math: true
background: transparent
background-image: ../../../assets/images/study/os/shell_image.jpg
category: study
categories: infra
title: '[infra] 내부 DNS 변경 후 특정 도메인 SERVFAIL 이슈 (BIND + DNSSEC)'
date: 2025-12-10 08:00:00
tags:
  - dns  - bind  - linux  - dnssec
```

# 개요

내부망에서 원래 쓰던 DNS 서버(이하 `UPSTREAM_DNS`)가 따로 있고,  
리눅스 서버 하나(이하 `LOCAL_DNS`)에는 BIND가 동작만 하고 있었다.  
`LOCAL_DNS`는 원래 DNS 전용 서버가 아니라, 애플리케이션 서버 + BIND 정도의 상태.

특정 이슈 때문에 내부 클라이언트들이 참조하는 DNS를 잠깐

- 기존: `UPSTREAM_DNS`
- 변경: `LOCAL_DNS` → 내부적으로는 다시 `UPSTREAM_DNS`로 forward

이렇게 바꾸고 나서, **특정 도메인(`install.internal-example.com` 같은 내부 도메인)** 만  
계속 `SERVFAIL` / timeout 이 나는 문제가 발생했다.

---

# 환경 정리 (간단)

실제 IP, 도메인 등은 전부 가명 처리했다.

- 원래 사내 DNS: `UPSTREAM_DNS`
- 임시 DNS 역할: `LOCAL_DNS` (BIND)
- 문제 도메인: `install.internal-example.com`

`LOCAL_DNS` 의 BIND 핵심 설정 (개념만):

```conf
options {
    directory "/var/named";
    recursion yes;

    forwarders {
        UPSTREAM_DNS_IP;
    };

    // 기본값: dnssec-enable yes;
    //        dnssec-validation auto;
};
```

의도는 단순히:

> "LOCAL_DNS는 캐시 + 포워더만 하고,  
> 실제 해석은 계속 UPSTREAM_DNS가 하게 두자."

였다.

---

# 증상

윈도우에서 DNS 서버를 `LOCAL_DNS` 로 설정했을 때:

```powershell
nslookup install.internal-example.com LOCAL_DNS_IP
;; → timeout 또는 SERVFAIL
```

반대로 DNS를 다시 `UPSTREAM_DNS` 로 돌리면:

```powershell
nslookup install.internal-example.com UPSTREAM_DNS_IP
;; → 정상 응답
```

리눅스 `LOCAL_DNS` 서버에서 테스트:

```bash
# 1) LOCAL_DNS 자신의 BIND에게 질의
dig @127.0.0.1 install.internal-example.com +noall +answer +comments
;; status: SERVFAIL

# 2) UPSTREAM_DNS 에 직접 질의
dig @UPSTREAM_DNS_IP install.internal-example.com +noall +answer +comments
;; status: NOERROR (정상 응답)
```

정리:

- 업스트림 DNS에 직접 질의하면 항상 정상
- 중간에 있는 BIND(LOCAL_DNS)를 거치면 SERVFAIL

---

# 원인: DNSSEC 검증 실패 (broken trust chain)

`LOCAL_DNS` 의 named 로그를 보면 대략 이런 메시지가 있었다.

```text
sudo egrep -R "internal-example.com" /etc/named.conf /etc/named.* /var/named 2>/dev/null
broken trust chain resolving 'install.internal-example.com/IN/A' ...
```

이 메시지는 BIND에서 **DNSSEC 검증이 실패했을 때** 자주 등장한다.

- 로컬 DNS는 DNS검증을 하고있었고 UPSTREAM_DNS는 DNS 검증을 하고있지 않았음
- DNSSEC = DNS 응답에 “전자서명+검증” 얹어서, 위조 여부를 잡아내는 기능

실제 흐름은 다음과 같다.

1. 클라이언트 → `LOCAL_DNS` 에 `install.internal-example.com` 질의
2. `LOCAL_DNS` → `UPSTREAM_DNS` 로 forward
3. `UPSTREAM_DNS` 는 정상 응답(A 레코드)을 반환
4. `LOCAL_DNS` 는 이 응답에 대해 **DNSSEC 검증 수행**
5. 해당 도메인의 trust chain 이 깨져 있어(`broken trust chain`)
6. 최종적으로 클라이언트에게 **SERVFAIL** 리턴

즉, UPSTREAM_DNS 준 응답이 DNSSEC 규칙 기준으로는 ‘신뢰할 수 없는 상태’

그래서:

- `dig @UPSTREAM_DNS` : 검증 없이 데이터만 보기 → 항상 NOERROR
- `dig @127.0.0.1` : 검증까지 하다가 실패 → SERVFAIL

DNSSEC 때문인지 확인할 때는 `+cdflag` 옵션이 유용하다.

```bash
dig @127.0.0.1 install.internal-example.com +dnssec +noall +answer +comments
## SERVFAIL
dig @127.0.0.1 install.internal-example.com +cdflag +noall +answer +comments
## 정상 응답
```

- `+cdflag` = Checking Disabled
- 즉 "검증은 하지 말고, 응답만 달라"는 의미
- 여기서는 NOERROR + 정상 A 레코드가 떨어짐 → **검증만 빼면 데이터는 정상**이라는 뜻

---

# 해결

이번 환경에서 `LOCAL_DNS` 는 **내부 캐시/포워더용**이었고,  
굳이 이 서버에서까지 DNSSEC 검증을 할 필요는 없다고 판단했다.

그래서 **DNSSEC 검증만 끄는 방향**으로 설정을 수정했다.

기존 `/etc/named.conf` (개념):

```conf
options {
    directory "/var/named";
    recursion yes;

    forwarders {
        UPSTREAM_DNS_IP;
    };

    dnssec-enable yes;
    dnssec-validation auto;
};
```

변경 후:

```conf
options {
    directory "/var/named";
    recursion yes;

    forwarders {
        UPSTREAM_DNS_IP;
    };

    dnssec-enable yes;        // 기능은 켜둬도 됨
    dnssec-validation no;     // 🔥 검증만 OFF
};
```

적용:

```bash
sudo named-checkconf
sudo systemctl reload named
```

그리고 다시 테스트:

```bash
dig @127.0.0.1 install.internal-example.com +noall +answer +comments
;; status: NOERROR

nslookup install.internal-example.com LOCAL_DNS_IP
;; 윈도우에서도 정상 응답
```

이후 해당 도메인 접속 문제는 모두 해결되었다.

---

# 메모

- 단순 **캐시/포워딩 용도로 쓰는 BIND** 라도, 기본값이면 DNSSEC 검증을 수행할 수 있다.
- `SERVFAIL` + 로그에 `broken trust chain resolving ...` 이 보이면  
  → **DNSSEC 검증 실패**를 우선 의심해볼 것.
- 빠르게 확인할 포인트:
    1. `dig @UPSTREAM_DNS` vs `dig @LOCAL_DNS` 비교
    2. `dig @LOCAL_DNS ... +cdflag` 로 검증 우회해 보기
    3. `/etc/named.conf` 의 `dnssec-validation` 값 확인

이번 케이스의 한 줄 정리:

> "원래 DNS는 따로 있는데, 임시로 올려둔 리눅스 BIND를 DNS로 쓰다가  
> 이 서버가 DNSSEC 검증까지 하면서 내부 도메인 체인이 깨진 걸 SERVFAIL로 막고 있었다."