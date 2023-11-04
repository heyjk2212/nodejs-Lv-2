# nodejs-Lv-2

## 과제 요구 사항: CRUD(Create, Read, Update, Delete) 기능이 포함된 REST API

```
1. 리뷰 작성 API
    - 책 제목, 리뷰 제목, 리뷰 내용, 별점, 작성자명, 비밀번호를 request에서 전달받기
    - 리뷰 별점은 최소 1점 ~ 최대 10점까지 등록 가능합니다.
2. 리뷰 목록 조회 API
    - 책 제목, 리뷰 제목, 별점, 작성자명, 작성 날짜를 조회하기
    - 리뷰 목록은 작성 날짜를 기준으로 내림차순(최신순) 정렬하기
3. 리뷰 상세 조회 API
    - 책 제목, 리뷰 제목, 리뷰 내용, 별점, 작성자명, 작성 날짜를 조회하기
4. 리뷰 수정 API
    - 책 제목, 리뷰 제목, 리뷰 내용, 별점을 request에서 전달받기
    - 비밀번호 일치 여부를 확인한 후, 동일할 때만 리뷰가 수정되게 하기
    - 선택한 리뷰가 존재하지 않을 경우, “존재하지 않는 리뷰입니다." 메시지 반환하기
5. 리뷰 삭제 API
    - 비밀번호 일치 여부를 확인한 후, 동일할 때만 리뷰가 삭제되게 하기
    - 선택한 리뷰가 존재하지 않을 경우, “존재하지 않는 리뷰입니다." 메시지 반환하기
6. 댓글 작성 API
    - 댓글 내용, 작성자명, 비밀번호를 request에서 전달받기
    - 댓글 내용을 비워둔 채 API를 호출하면 “댓글 내용을 입력해주세요” 메시지 반환하기
7. 댓글 목록 조회 API
    - 조회하는 리뷰에 작성된 모든 댓글을 목록 형식으로 조회하기
    - 작성 날짜 기준으로 내림차순(최신순) 정렬하기
8. 댓글 수정 API
    - 댓글 내용, 비밀번호를 request에서 전달받기
    - 댓글 내용을 비워둔 채 API를 호출하면 “댓글 내용을 입력해주세요” 메시지 반환하기
9. 댓글 삭제 API
    - 비밀번호를 비교하여, 동일할 때만 댓글이 삭제되게 하기
```

## Directory Structure
```
├── prisma
│   └── schema.prisma
├── src
│   ├── app.js
│   ├── routes
│   │   ├── comments.router.js
│   │   └── reviews.router.js
│   └── utils
│       └── prisma
│           └── index.js
├── package.json
└── yarn.lock
```

## Tech Stack
1. 데이터베이스: `MySQL`
2. ORM: `Prisma`
3. 웹 프레임워크: `Express.js`
4. 패키지 매니저: `yarn`
5. 모듈 시스템: `ES6`

## ERD
<img src= "https://github.com/heyjk2212/nodejs-Lv-2/assets/147573753/6e0915a0-d7ff-4bf7-8d29-08230ec52882" width="500">


## API SPEC

|기능|METHOD|URL|Req body|Res body|
|:--|:--:|:--|:--|:--|
|리뷰 등록|POST|/api/reviews||
|리뷰 목록 조회|GET|/api/reviews|||
|리뷰 상세 조회|GET|/api/review/:reviewId|
|리뷰 정보 수정|PUT|/api/review/:reviewId|||
|리뷰 삭제|DELETE|/api/review/:reviewId||
|댓글 작성|POST|/api/review/:reviewId/comments||
|댓글 목록 조회|GET|/api/review/:reviewId/comments|||
|댓글 수정|PUT|/api/review/:reviewId/comments/:commentsId|||
|댓글 삭제 |DELETE|/api/review/:reviewId/comments/:commentsId||
