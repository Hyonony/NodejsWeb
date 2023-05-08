const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');
const session = require('express-session');

// body-parser 미들웨어를 사용하여 POST 데이터를 파싱합니다.
const bodyParser = require('body-parser');
dotenv.config();
const httpPort = process.env.HTTP_PORT;

// MySQL 연결 객체를 생성합니다.
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// MySQL 연결 객체를 app.locals에 저장합니다.
app.locals.connection = connection;

// html 파일을 렌더링하기 위한 미들웨어 설정
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.get('/pages/login', (req, res) => {
  res.render('pages/login');
});

app.get('/pages/signup', (req, res) => {
    res.render('pages/signup');
});

// 회원 가입을 처리하는 미들웨어
app.post('/signup', (req, res) => {
    const userID = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
  
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  
    connection.connect((err) => {
      if (err) throw err;
      console.log('MySQL에 연결되었습니다.');
    });
  
    const sql = `INSERT INTO users (userID, password, email) VALUES ('${userID}', '${password}', '${email}')`;
  
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  
    connection.end();
  
    res.send('회원 가입이 완료되었습니다.');
  });
app.post('/login', (req, res) => {
    const userID = req.body.username;
    const password = req.body.password;

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log('MySQL에 연결되었습니다.');
    });

    // 사용자 정보를 가져와 로그인 검사
    connection.query('SELECT * FROM users WHERE userID = ? AND password = ?', [userID, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = userID;
            res.redirect('/home');
        } else {
            res.send('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    });

    connection.end();
});
// MySQL 연결 객체를 시작합니다.
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL에 연결되었습니다.');
});

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
      res.send(`환영합니다, ${req.session.username}님!`);
  } else {
      res.redirect('/login');
  }
});

app.use((req, res, next) => {
    res.status(404).send('404 에러');
});

app.listen(httpPort, () => {
    console.log('서버가 시작되었습니다.');
});