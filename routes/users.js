var express = require('express');
var router = express.Router();
var User = require('../models/User');
var _ = require('lodash');

/* GET users listing. */
// http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/signin');
    }
}

function validateForm(form, options) {
  var nickname = form.nickname || "";
  var email = form.email || "";
  nickname = nickname.trim();
  email = email.trim();

  if (!nickname) {
    return '닉네임을 입력해주세요.';
  }

  if (!email) {
    return '이메일을 입력해주세요.';
  }

  if (!form.password && options.needPassword) {
    return '비밀번호를 입력해주세요.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return null;
}

// 회원가입 창 띄우기
router.get('/new', function(req, res, next){
  res.render('users/new', {messages: req.flash()});
});

// 회원가입
router.post('/', function(req, res, next) {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash('danger', '동일한 이메일 주소가 이미 존재합니다.');
      res.redirect('back');
    }
    var newUser = new User({
      nickname: req.body.nickname,
      email: req.body.email,
    });
    newUser.password = req.body.password;

    newUser.save(function(err) {
      if (err) {
        return next(err);
      } else {
        req.flash('success', '가입이 완료되었습니다. 로그인 해주세요.');
        res.redirect('/');
      }
    });
  });
});

// 로그인 창 화면 띄우기
router.get('/signin', function(req, res, next) { 
  res.render('users/signin'); 
});

// 회원 관리 목록 페이지 띄우기 
router.get('/userlist', function(req, res, next) { 
 User.find({}, function(err, users){
  res.render('users/userlist', {users : users}); 
 });
});

// 회원 탈퇴 
router.delete('/:id', function(req, res, next){
  User.findOneAndRemove({_id:req.params.id}, function(err, user){
    if(err){
      return next(err);
     }
      req.flash('success', '탈퇴되었습니다.');
      res.render('index'); // 탈퇴하고 메인으로 가기
   });
});
// 회원 리스트 삭제
router.delete('/delete/:id', function(req, res, next){
   User.findOneAndRemove({_id:req.params.id}, function(err, user){
    if(err){
      return next(err);
     }
      req.flash('success', '회원이 삭제되었습니다.');
   });
   User.find({}, function(err, next){
     if(err){
       return next
     }
   })
});

// 회원 정보 수정 창 띄우기
router.get('/edit/:id', function(req, res, next){
  User.findById({_id: req.params.id}, function(err, user){
    res.render('users/new', {user:user});
  });
});

// 회원정보 수정
router.put('/:id', function(req, res, next){
  User.findById({_id: req.params.id}, function(err, user){
    user.nickname = req.body.nickname;
    user.email = req.body.nickname;
    user.password = req.body.password;
    user.save(function(err){
      if(err){
        return next(err);
      }
      req.flash('success', '회원 정보가 수정되었습니다');
      res.redirect('/');
    });
  })
});

module.exports = router;
