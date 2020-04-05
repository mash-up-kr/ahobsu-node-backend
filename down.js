const url =
  'https://w.namu.la/s/849df41483d47c123c134c64c16ebfbea586fc41f9642d8ec4099dc0c8bb007740b0c98bec6c92dff0bea6510e87abbf4c9b005f8ebccbe7d8277672bfa8deabe1680628d3005f40ae0f48ad62022c4fc157395ff5de9e6264c7a03f743f2d17';

// 저장할 위치를 지정
const savepath = `Pierce.png`;

// 사용 모듈 정의
const https = require('https'); // HTTP 모듈
const fs = require('fs'); // 파일 처리 관련 모듈

// 출력 지정
const outfile = fs.createWriteStream(savepath);

// 비동기로 URL의 파일 다운로드
https.get(url, function (res) {
  res.pipe(outfile);
  res.on('end', function () {
    outfile.close();
    console.log('ok');
  });
});
