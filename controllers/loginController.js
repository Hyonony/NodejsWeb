// loginController.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.login = (req, res) => {
  const userID = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM users WHERE userID = ? AND password = ?',
    [userID, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = userID;
        res.redirect('/pages/homepage');
      } else {
        res.send('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  );
};