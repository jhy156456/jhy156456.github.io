/**
 * 조회수 카운터
 * Firebase Realtime Database를 사용하여 조회수를 추적합니다.
 */

(function() {
  'use strict';

  // Firebase 설정
  const firebaseConfig = {
    apiKey: "AIzaSyBOFhnIw3DNLkHzBHGtno1t5bWs992GQ58",
    authDomain: "jhy156456-blog-views.firebaseapp.com",
    databaseURL: "https://jhy156456-blog-views-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jhy156456-blog-views",
    storageBucket: "jhy156456-blog-views.firebasestorage.app",
    messagingSenderId: "552788902808",
    appId: "1:552788902808:web:73ad1b70867b60e515a1ed"
  };

  // Firebase 초기화 (설정이 완료된 경우에만)
  let db = null;
  let initialized = false;

  // Firebase가 설정되지 않은 경우를 위한 폴백 (localStorage 사용)
  const useLocalStorage = !firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY";

  /**
   * Firebase 경로에 안전한 키로 변환
   * Firebase Realtime Database 경로에는 ., #, $, [, ] 문자가 허용되지 않음
   */
  function encodeFirebasePath(path) {
    return path
      .replace(/^\/+/, '') // 앞의 슬래시 제거
      .replace(/\./g, '_dot_')
      .replace(/#/g, '_hash_')
      .replace(/\$/g, '_dollar_')
      .replace(/\[/g, '_lbracket_')
      .replace(/\]/g, '_rbracket_');
  }

  /**
   * 페이지 경로를 Firebase 안전 키로 변환
   */
  function getPageKey() {
    return encodeFirebasePath(window.location.pathname);
  }

  /**
   * localStorage를 사용한 조회수 추적 (폴백)
   */
  function incrementLocalStorageCounter() {
    const pageKey = getPageKey();
    const storageKey = 'view_count_' + pageKey.replace(/\//g, '_');
    const viewedKey = 'viewed_' + pageKey.replace(/\//g, '_');
    
    // 같은 세션에서 이미 조회한 경우 카운트하지 않음
    if (sessionStorage.getItem(viewedKey)) {
      return;
    }

    // 조회 표시
    sessionStorage.setItem(viewedKey, 'true');

    // 로컬 카운터 증가
    let count = parseInt(localStorage.getItem(storageKey) || '0', 10);
    count++;
    localStorage.setItem(storageKey, count.toString());
    
    // 화면에 표시
    updateViewCountDisplay(count);
  }

  /**
   * Firebase를 사용한 조회수 추적
   */
  function incrementFirebaseCounter() {
    if (!db || !initialized) {
      return;
    }

    const originalPath = window.location.pathname;
    const pageKey = getPageKey(); // Firebase 안전 경로
    const viewedKey = 'viewed_' + encodeFirebasePath(originalPath).replace(/\//g, '_');
    
    // 같은 세션에서 이미 조회한 경우 카운트하지 않음
    if (sessionStorage.getItem(viewedKey)) {
      // 이미 조회했어도 현재 카운트는 표시
      const counterRef = db.ref('views/' + pageKey);
      counterRef.once('value', (snapshot) => {
        const count = snapshot.val() || 0;
        updateViewCountDisplay(count);
      });
      return;
    }

    // 조회 표시
    sessionStorage.setItem(viewedKey, 'true');

    // Firebase에 카운트 증가
    const counterRef = db.ref('views/' + pageKey);
    counterRef.transaction((current) => {
      return (current || 0) + 1;
    }, (error, committed, snapshot) => {
      if (error) {
        console.error('조회수 업데이트 실패:', error);
      } else if (committed) {
        const count = snapshot.val();
        updateViewCountDisplay(count);
      }
    });
  }

  /**
   * 조회수 표시 업데이트
   */
  function updateViewCountDisplay(count) {
    const viewCountElements = document.querySelectorAll('.view-count');
    viewCountElements.forEach((element) => {
      element.textContent = count.toLocaleString();
    });
  }

  /**
   * 초기화
   */
  function init() {
    if (useLocalStorage) {
      // localStorage 버전 사용
      incrementLocalStorageCounter();
    } else {
      // Firebase 버전 사용
      try {
        // Firebase가 이미 로드되어 있는지 확인
        if (typeof firebase !== 'undefined') {
          firebase.initializeApp(firebaseConfig);
          db = firebase.database();
          initialized = true;
          incrementFirebaseCounter();
        } else {
          // Firebase가 로드되지 않았으면 localStorage 사용
          console.warn('Firebase가 로드되지 않았습니다. localStorage를 사용합니다.');
          incrementLocalStorageCounter();
        }
      } catch (error) {
        console.error('Firebase 초기화 실패:', error);
        incrementLocalStorageCounter();
      }
    }
  }

  // DOM이 로드되면 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

