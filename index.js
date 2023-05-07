const express = require('express');
const app = express();
const dotenv = require('dotenv');

// body-parser 미들웨어를 사용하여 POST 데이터를 파싱합니다.
const bodyParser = require('body-parser');
dotenv.config();
const httpPort = process.env.HTTP_PORT;

// html 파일을 렌더링하기 위한 미들웨어 설정
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/pages/signup', (req, res) => {
    res.render('pages/signup');
});

// 회원 가입을 처리하는 미들웨어
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    // 여기서부터는 데이터베이스 등에 회원 정보를 저장하는 로직을 작성합니다.
    // 생략
    res.send('회원 가입이 완료되었습니다.');
});

// 404 에러 핸들링 미들웨어
app.use((req, res, next) => {
    res.status(404).send('404 에러');
});

app.listen(httpPort, () => {
    console.log('서버가 시작되었습니다.');
});