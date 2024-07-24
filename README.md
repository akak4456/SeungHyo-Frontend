# SeungHyo-frontend

이 앱은 승효 프로젝트의 프론트엔드를 담당한 것

## 앱 실행 방법

이 앱은 리액트로 제작이 되어 있습니다. 따라서 우선 node.js(version 20.15.1) 을 설치해야 합니다.
그런 다음 다음의 스크립트를 승효 프로젝트의 루트 폴더에 실행합니다.(README.md 파일이 있는 곳)

```
npm install
npm start
```

이렇게 한 뒤에 브라우저에 http://localhost:3000 으로 접근하면 됩니다.

## 페이지 접근 방법

이 앱은 SPA 로 설계가 되어있습니다. 대부분의 경우 특정 버튼 혹은 링크를 누르면 다른 페이지로 이동하게 구현하였지만, 특정 페이지 같은 경우 일반적인 방법으로 접근이 힘들 수도 있습니다. 따라서 이 페이지에서 구현된 경로 전체를 밝히겠습니다.

/ : intro 페이지

/problem-list : 문제들을 보여주는 페이지

/reflection-note-list : 오답노트들을 보여주는 페이지

/board : 게시글들을 보여주는 페이지

/search : 검색 페이지

/join : 회원가입 페이지

/login : 로그인 페이지

/agree : 회원가입 동의 페이지(현재 구현 안되어있음)

/pw-find : 비밀번호 찾기 페이지

/pw-reset : 비밀번호 초기화 페이지

/setting/info-edit : 회원정보 변경 페이지

/setting/pw-change : 비밀번호 변경 페이지

/setting/withdraw : 회원탈퇴 페이지

/user : 유저 페이지(상태 메시지, 유저 관련 통계 정보를 보여줌)

/problem : 문제 페이지

/reflection-note : 오답노트 페이지

/write : 글쓰기 페이지

/article : 게시글 페이지
