# Ahobsu-Node-Backend

유니큐와 유초코파이 노드로 탈주하다😎

<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

# MashUp Node JS Project

### 💻 [API](https://moti.company/apiDocs/)

### [iOS APP](https://apps.apple.com/kr/app/moti/id1496912171)

[![moti](https://img.youtube.com/vi/m91rLvwMmXo/0.jpg)](https://www.youtube.com/watch?v=m91rLvwMmXo)

## 매일매일 미션을 수행하며 카드를 수집해 보자

### 소개글

- "Make Own True Identity"
- [소개페이지](https://his-0203.github.io/)

#### 매일 하루에 한 번 받을 질문에 답하면서 자신을 기록해보세요.

- 질문에 답을 하고 기록하는 과정에서
- 당신이 무엇을 좋아하는지
- 당신이 어떤 추억을 가지고 있었는지
- 앞으로 당신이 어떤 삶을 살고 싶은지
- 알아가 보세요.

#### 단순히 기록에서 그치지 않고 당신이 기록한 일주일은 한 장의 꿈을 담은 카드로 완성됩니다.

#### 꾸준히 하루하루를 기록하면서 카드를 수집해보세요.

### MOTI 사용법

1. 하루에 받는 질문은 총 3개! 그중 마음에 드는 질문을 선택하세요(마음에 드는 질문이 없다면 3번까지 새로 질문을 받아볼 수 있습니다)
2. 사진과 글을 이용해서 질문에 간단한 답을 하면 끝!
3. 답변을 완료한 날은 카드 그림의 한 부분이 채워집니다.
4. 일주일 동안 꾸준한 기록을 통해 완성된 카드를 수집해보세요!
5. 앨범을 통해서 기록된 내용을 되돌아볼 수 있습니다.

### 주요 기능

- 로그인 회원가입
  - 구글 로그인
  - 애플 로그인
  - 회원 탈퇴
- 매일 새로운 미션 3가지 제공
  - 미션 재발급 기능(제한적으로 제공)
- 주별로 새로운 카드 세트 제공
- 답변작성
  - 당일 답변 수정
  - 일주일치 답변 조회
  - 특정날짜 답변 조회
- 파일
  - 이미지 업로드
  - 일주일치 이미지 제공

### 폴더 구조

- \_\_test\_\_ : 테스트 코드
- bin : 서버에 대한 부가설명
- config : 설정파일
- lib : 공통함수 (helper)
- middleware : 미들웨어 모아둔 곳
- models : data model
- public : 정적파일
- routes : 라우터
- swagger : api docs and testing

### Quick Start

- node : v11.13.0
- npm : 6.7.0

- 의존성 설치

```sh
git clone https://github.com/mash-up-kr/Ahobsu-Node-Backend.git
cd Ahobsu-Node-Backend
npm install
```

- .env.default를 .env로 변경 후 키 설정

```env
AWSAccessKeyId=YOUR_AWSAccessKeyId
AWSSecretKey=YOUR_AWSSecretKey
buket=YOUR_buket
privateKey=YOUR_privateKey
TZ=Asia/Seoul
DB_USERNAME=YOUR_DB_USERNAME
DB_HOST=YOUR_DB_HOST
DB_PASSWORD=YOUR_DB_PASSWORD
```

- 개발 서버 시작

```sh
  npm start:test
```

- 배포 시작(pm2로 시작)

```sh
  npm run depoly
```

### 써드파티 패키지

| 모듈                                                                            | 역할                                                                                                                                                    | 사용한 부분 |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [aws-sdk](https://github.com/aws/aws-sdk-net)                                   | Amazon Web Services and build scalable solutions with Amazon S3, Amazon DynamoDB, Amazon Glacier                                                        |             |
| [cookie-parser](https://github.com/expressjs/cookie-parser)                     | 쿠키파서                                                                                                                                                |             |
| [cors](https://github.com/expressjs/cors)                                       | CORS는 CORS 를 다양한 옵션 으로 활성화하는 데 사용할 수 있는 Connect / Express 미들웨어 를 제공하기위한 node.js 패키지입니다                            |
| [debug](https://www.npmjs.com/package/debug/v/2.6.9)                            | 노드 코어의 디버깅 기술을 모델로 한 작은 node.js 디버깅 유틸리티                                                                                        |             |
| [dotenv](https://github.com/motdotla/dotenv)                                    | nodejs 프로젝트를 위해 .env에서 환경 변수를로드                                                                                                         |             |
| [express](https://github.com/expressjs/express)                                 | 미니멀리스트 웹 프레임 워크                                                                                                                             |             |
| [formidable](https://github.com/node-formidable/node-formidable)                | 파일 업로드를 구문 분석하기위한 node.js 모듈                                                                                                            |             |
| [greenlock-express](https://github.com/stampr/greenlock-express.js/tree/master) | 웹 서버 , 웹 브라우저 및 node.js 미들웨어 시스템을위한 인증서                                                                                           |             |
| [http-errors](https://github.com/jshttp/http-errors)                            | Express, Koa, Connect 등에 대한 HTTP 오류를 쉽게 생성                                                                                                   |             |
| [husky](https://github.com/typicode/husky)                                      | git hook을 쉽게 사용할 수 있게 도와주는 라이브러리                                                                                                      |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)                      | JSON 형태로 인증토큰을 만들어 통신할때쓰는 인증방식                                                                                                     |             |
| [moment](https://github.com/moment/moment)                                      | 날짜관련 작업을 위한 자바스크립트 라이브러리                                                                                                            |             |
| [morgan](https://github.com/expressjs/morgan)                                   | node.js 용 HTTP 요청 로거 미들웨어                                                                                                                      |             |
| mysql2                                                                          | 데이터베이스                                                                                                                                            |             |
| [nodemon](https://github.com/remy/nodemon)                                      | 디렉토리의 파일 변경이 감지되면 노드 응용 프로그램을 자동으로 다시 시작                                                                                 |             |
| [pm2](https://github.com/Unitech/pm2)                                           | JavaScript 런타임 Node.js의 프로세스 관리자                                                                                                             |             |
| redirect-https                                                                  |                                                                                                                                                         |             |
| [sequelize](https://github.com/sequelize/sequelize)                             | Node.js를위한 사용하기 쉬운 다중 SQL 언어 ORM                                                                                                           |             |
| [sequelize-cli](https://github.com/sequelize/cli)                               | Sequelize 명령 줄 인터페이스 (CLI)                                                                                                                      |             |
| [sqlite3](https://github.com/mapbox/node-sqlite3)                               | Node.js에 대한 비동기 비 차단 SQLite3 바인딩                                                                                                            |
| [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)          | 일을 기반으로 자동 생성 swagger-ui 생성 API 문서를 명시 적으로 제공                                                                                     |             |
| [ts-loader](https://github.com/TypeStrong/ts-loader)                            | 웹 팩용 TypeScript 로더 제공                                                                                                                            |             |
| [typescript](https://github.com/Microsoft/TypeScript)                           | TypeScript는 JavaScript 출력을 정리하기 위해 컴파일되는 JavaScript의 상위 집합입니다.                                                                   |             |
| [webpack](https://github.com/webpack/webpack)                                   | 자바 스크립트 및 친구를 위한 번들러입니다. 많은 모듈을 묶음 자산으로 묶습니다. 코드 분할을 통해 필요에 따라 응용 프로그램의 일부를 로드 할 수 있습니다. |             |
| [webpack-node-externals](https://github.com/liady/webpack-node-externals)       | Webpack에서 노드 모듈을 쉽게 제외                                                                                                                       |
| [@types/npm](https://github.com/DefinitelyTyped/DefinitelyTyped)                | 고품질 TypeScript 유형 정의를위한 저장소입니다.                                                                                                         |
| [jest](https://github.com/facebook/jest)                                        | 포괄적인 JavaScript 테스트 솔루션                                                                                                                       |             |
| [supertest](https://github.com/visionmedia/supertest)                           | 유창한 API를 사용하여 node.js HTTP 서버를 테스트하기위한 수퍼 에이전트 중심 라이브러리.                                                                 |             |

## Error Code

| status | 상황                      |
| ------ | ------------------------- |
| 1100   | 토큰이 유효하지 않을 경우 |

## Author

👤 **YuChocopie**

<img src="https://avatars2.githubusercontent.com/u/18034145?s=460&v=4" width=80/>

Github: [@YuChocopie](https://github.com/YuChocopie)

👤 **Yuni-Q**

<img src="https://avatars0.githubusercontent.com/u/18049757?s=460&v=4" width=80/>

Github: [@Yuni-Q](https://github.com/Yuni-Q)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mash-up-kr/Ahobsu-Node-Backend/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
