// homeController.js
exports.home = (req, res) => {
    if (req.session.loggedin) {
      res.send(`환영합니다, ${req.session.username}님!`);
    } else {
      res.redirect('/pages/login');
    }
  };