const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(session({
  secret: 'hellloworld',  // 세션 데이터를 암호화하기 위한 키
  resave: false,
  saveUninitialized: false
}));


// MySQL 연결

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// 라우팅 설정
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/loginRoutes');
const signupRoutes = require('./routes/signupRoutes');

app.set('view engine', 'ejs');
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);

// 서버 실행
app.listen(process.env.HTTP_PORT, function() {
  console.log(`Server is running on port ${process.env.HTTP_PORT}!`);
});