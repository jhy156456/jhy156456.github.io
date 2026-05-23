# Firebase Realtime Database 설정 (청첩장 · 블로그 조회수)

이 사이트는 **Cloud Firestore가 아니라 Realtime Database**만 사용합니다.  
콘솔에서 DB를 만들지 않았거나 규칙이 막혀 있으면, 방명록·참석 여부는 **내 폰에만** 보이거나 저장이 안 됩니다.

프로젝트 ID는 코드에 맞춰 **`jhy156456-blog-views`** 기준으로 안내합니다. (다른 프로젝트를 쓰면 `wedding/index.html`, `assets/js/view-counter.js`의 `firebaseConfig`를 그 프로젝트 값으로 바꿔야 합니다.)

---

## 1. Firebase 콘솔 들어가기

1. 브라우저에서 [Firebase Console](https://console.firebase.google.com/) 접속  
2. **본인 Google 계정**으로 로그인 (어떤 계정인지 모르면 프로젝트 목록에 `jhy156456-blog-views`가 보이는 계정을 찾아야 합니다.)

---

## 2. Realtime Database 만들기

1. 왼쪽 메뉴 **빌드(Build)** → **Realtime Database**  
2. **데이터베이스 만들기**  
3. **위치**: 코드의 URL이 `asia-southeast1` 이므로 가능하면 **싱가포르(asia-southeast1)** 등 가까운 리전 선택  
4. 처음 보안 규칙은 **잠긴 모드**로 시작해도 됩니다. 아래 3번에서 규칙을 붙여 넣습니다.

> 이미 **Firestore만** 만들어 두었다면, 그건 별 서비스입니다. **Realtime Database** 메뉴에서 위처럼 **별도로** 생성해야 합니다.

---

## 3. 보안 규칙 붙여 넣기 (필수)

1. Realtime Database 화면에서 상단 **규칙(Rules)** 탭  
2. 아래 JSON **전체**를 복사해 에디터에 덮어쓰기  
3. **게시(Publish)** 클릭

이 규칙은 다음만 공개 읽기·쓰기 허용합니다.

| 경로 | 용도 |
|------|------|
| `wedding/guestbook` | 모바일청첩장 방명록 (화면에 실시간 표시) |
| `wedding/rsvp` | 모바일청첩장 참석 여부 **등록만** (익명 읽기 불가 → 목록은 Firebase 콘솔에서만 확인) |
| `views/...` | 블로그 조회수 (`view-counter.js`) |

청첩장 페이지에서는 참석 **목록을 보여 주지 않으며**, 위 규칙처럼 `rsvp`의 `.read`를 끄면 일반 방문자는 REST/SDK로도 남의 응답을 열람하기 어렵습니다. (쓰기 `push`는 그대로 가능합니다.)

```json
{
  "rules": {
    "wedding": {
      "guestbook": {
        ".read": true,
        ".write": true
      },
      "rsvp": {
        ".read": false,
        ".write": true
      }
    },
    "views": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **스팸·악용 방지**는 이 규칙만으로는 어렵습니다. 나중에 Firebase Authentication을 붙이거나, Cloud Functions로 검증하는 식으로 좁히는 것을 권장합니다. 당장 “다른 사람도 같이 보이게”만 필요하면 위로 충분합니다.

---

## 4. 로컬 규칙 파일 (선택)

레포 루트의 `database.rules.json`과 위 내용이 같습니다.  
[Firebase CLI](https://firebase.google.com/docs/cli)로 배포하는 경우:

```bash
firebase deploy --only database
```

(`firebase.json`에 `database` 대상이 있어야 합니다.)

---

## 5. 동작 확인

1. GitHub Pages 등 **배포된 URL**로 `wedding/index.html`이 있는 페이지 접속 (또는 로컬에서 파일 열기)  
2. 페이지 하단 **동기화 상태**가 **「Firebase 실시간 연동 중입니다.」** 인지 확인  
3. 다른 브라우저·시크릿 창에서 같은 페이지를 열어, 방명록/참석 여부가 **같이 보이는지** 확인  

여전히 실패하면 브라우저 **F12 → Console / Network**에 `PERMISSION_DENIED` 같은 메시지가 있는지 봅니다. 그 경우 거의 항상 **규칙 미게시** 또는 **경로 오타**입니다.

---

## 6. 관련 문서

- 블로그 조회수만: [VIEW_COUNTER_SETUP.md](./VIEW_COUNTER_SETUP.md)
