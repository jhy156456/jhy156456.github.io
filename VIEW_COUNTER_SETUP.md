# 조회수 기능 설정 가이드

블로그에 조회수 기능이 추가되었습니다. 두 가지 방법으로 사용할 수 있습니다.

## 방법 1: localStorage 사용 (기본, 즉시 사용 가능)

현재 설정된 상태로 바로 사용할 수 있습니다. 조회수는 브라우저의 localStorage에 저장되므로:
- ✅ 설정 불필요, 즉시 사용 가능
- ✅ 서버나 외부 서비스 불필요
- ⚠️ 각 브라우저/기기별로 별도 카운트 (정확도 낮음)
- ⚠️ 브라우저 데이터 삭제 시 초기화

**사용법**: 별도 설정 없이 바로 사용 가능합니다.

## 방법 2: Firebase Realtime Database 사용 (권장)

더 정확한 조회수를 원한다면 Firebase를 설정하세요.

### Firebase 설정 단계

1. **Firebase 프로젝트 생성**
   - [Firebase Console](https://console.firebase.google.com/)에 접속
   - "프로젝트 추가" 클릭
   - 프로젝트 이름 입력 후 생성

2. **Realtime Database 생성**
   - Firebase Console에서 "Realtime Database" 선택
   - "데이터베이스 만들기" 클릭
   - 위치 선택 (가장 가까운 지역 선택)
   - 보안 규칙: "테스트 모드로 시작" 선택 (나중에 보안 규칙 수정 필요)

3. **웹 앱 등록**
   - Firebase Console에서 ⚙️ 아이콘 > "프로젝트 설정"
   - "내 앱" 섹션에서 웹 아이콘(</>) 클릭
   - 앱 닉네임 입력 후 "앱 등록"
   - Firebase SDK 설정 정보 복사

4. **보안 규칙 설정**
   - Realtime Database > 규칙 탭
   - 다음 규칙으로 변경:
   ```json
   {
     "rules": {
       "views": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```
   ⚠️ **주의**: 이 규칙은 모든 사용자가 읽고 쓸 수 있습니다. 프로덕션 환경에서는 더 엄격한 규칙을 사용하세요.

5. **코드에 Firebase 설정 적용**
   - `assets/js/view-counter.js` 파일 열기
   - `firebaseConfig` 객체에 Firebase에서 복사한 설정 정보 입력:
   ```javascript
   const firebaseConfig = {
     apiKey: "여기에_API_KEY_입력",
     authDomain: "여기에_AUTH_DOMAIN_입력",
     databaseURL: "여기에_DATABASE_URL_입력",
     projectId: "여기에_PROJECT_ID_입력",
     storageBucket: "여기에_STORAGE_BUCKET_입력",
     messagingSenderId: "여기에_MESSAGING_SENDER_ID_입력",
     appId: "여기에_APP_ID_입력"
   };
   ```

6. **Firebase SDK 활성화**
   - `_layouts/blog.html` 파일에서 주석 처리된 Firebase SDK 스크립트 주석 해제:
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"></script>
   ```

### Firebase 무료 티어 제한

- 저장 용량: 1GB
- 동시 연결: 100개
- 다운로드: 10GB/월
- 업로드: 10GB/월

일반적인 블로그 조회수 추적에는 충분합니다.

## 방법 3: 다른 서비스 사용

### GoatCounter (프라이버시 친화적, 무료)

1. [GoatCounter](https://www.goatcounter.com/)에 가입
2. 사이트 추가
3. 제공되는 스크립트를 `view-counter.js`에 통합

### Plausible Analytics (프라이버시 친화적, 유료)

1. [Plausible](https://plausible.io/)에 가입
2. 사이트 추가
3. 제공되는 스크립트 사용

## 문제 해결

### 조회수가 표시되지 않을 때

1. 브라우저 콘솔(F12)에서 오류 확인
2. `assets/js/view-counter.js` 파일이 올바른 경로에 있는지 확인
3. JavaScript가 활성화되어 있는지 확인

### Firebase 연결이 안 될 때

1. Firebase 설정 정보가 올바른지 확인
2. Firebase SDK 스크립트가 주석 해제되어 있는지 확인
3. Realtime Database가 생성되어 있는지 확인
4. 보안 규칙이 올바르게 설정되어 있는지 확인

## 참고사항

- 조회수는 같은 세션(브라우저 탭)에서 중복 카운트되지 않습니다
- 새로고침(F5)을 해도 같은 세션에서는 카운트되지 않습니다
- 다른 브라우저나 시크릿 모드에서 접속하면 카운트됩니다

