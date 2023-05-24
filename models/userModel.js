const mysql = require('mysql2');

// MySQL 연결 객체를 생성합니다.
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const userModel = {
  createUser: (userID, email, password) => {
    const sql = `INSERT INTO users (userID, email, password) VALUES ('${userID}', '${email}', '${password}')`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  findUserByIDAndPassword: (userID, password) => {
    const sql = 'SELECT * FROM users WHERE userID = ? AND password = ?';
    const params = [userID, password];

    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = userModel;