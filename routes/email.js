var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//  Login/New User
router.post('/', (req, res) => {
  if (req.body.email) {
    const userData = {
      email: req.body.email,
      fName: req.body.fName || '',
      sName: req.body.sName || '',
      phoneNumber:  req.body.phone  || ''
    };
    User.create(userData, (error, user) => {
      if (error) {
        return res.json({
          response: 0,
          msg: 'Oops',
        });
      }
      req.session.userId = user._id;
      return res.json({
        response: 1,
        msg: 'Thanks for registering your interest, we\'ll get in touch as soon as we can.',
      });
    });
  } else {
    return res.json({
      response: 0,
      msg: 'Looks Like You Have Some Missing Fields',
    });
  }
});

module.exports = router;
