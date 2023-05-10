// signupController.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.signup = (req, res) => {
  const userID = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  connection.query(
    `INSERT INTO users (userID, password, email) VALUES ('${userID}', '${password}', '${email}')`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('회원 가입이 완료되었습니다.');
    }
  );
};