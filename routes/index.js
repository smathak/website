var express = require('express');
var User = require('../models/User');
var _ = require('lodash');

var router = express.Router();

/* GET home page. */

// Main
router.get('/', function(req, res, next) {
  res.render('index', {message : req.flash()});
});


// 로그인 
router.post('/signin', function(req, res, next) { 
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user) {
      req.flash('danger', '존재하지 않는 사용자 입니다.');
      res.redirect('back');
    }
    // else if (req.body.password !== user.password) {
    //   req.flash('danger', '비밀번호가 일치하지 않습니다.');
    //   res.redirect('back');
    // }
    else if (!user.validatePassword(req.body.password)) {
      req.flash('danger', '비밀번호가 일치하지 않습니다.');
      res.redirect('back');
    }
     else {
      req.session.user = user; 
      req.flash('success', '로그인 되었습니다.');
      res.redirect('/');
    }
  });
});

// 로그아웃
router.get('/signout', function(req, res, next) {
  delete req.session.user;
  req.flash('success', '로그아웃 되었습니다.');
  res.redirect('/');
});

// MyPage
router.get('/mypage', function(req, res, next) {
  res.render('mypage/profile');
});



module.exports = router;

