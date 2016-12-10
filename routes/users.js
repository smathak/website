var express = require('express');
var router = express.Router();
var Host = require('../models/Host');
var User = require('../models/User');
var Reservation = require('../models/Reservation');
var Favorite = require('../models/Favorite');
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
    if(req.body.password == req.body.passwordComrifm){
      newUser.password = newUser.generateHash(req.body.password);
    }
    

    newUser.save(function(err) {
      if (err) {
        return next(err);
      } else {
        req.flash('success', '로그인 하세요');
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
router.get('/userlist/:id', function(req, res, next) {
 User.findById({_id:req.params.id}, function(err, user){
   if (user.admin){
      User.find({}, function(err, users){
        res.render('users/userlist', {users : users, messages: req.flash()}); 
      });
   }else{
     req.flash('danger', "관리자만 접속할 수 있습니다.");
     res.redirect('back');
   }
 });

});

// 회원 탈퇴 
router.delete('/:nickname', function(req, res, next){
    User.findOneAndRemove({nickname:req.params.nickname}, function(err, user){
      if(err){
        return next(err);
      }
   });
   Host.remove({nickname: req.params.nickname}, function(err){
     if(err){
       return next(err);
     }
   });
   Reservation.remove({guest: req.params.nickname}, function(err){
      if(err){
        return next(err);
      }
   });
    Favorite.remove({guest: req.params.nickname}, function(err){
      if(err){
        return next(err);
      }
      req.flash('success', '탈퇴되었습니다.');
      res.redirect('/signout');
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
   User.find({}, function(err, users){
     if(err){
       return next
     }
     res.render('users/userlist', {users: users});
   })
});

// 회원 정보 수정 창 띄우기
router.get('/edit/:id', function(req, res, next){
  User.findById({_id: req.params.id}, function(err, user){
    res.render('mypage/profileEdit', {user:user});
  });
});

// 회원정보 수정
router.put('/:id', function(req, res, next){
  User.findById({_id: req.params.id}, function(err, user){
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.birthday = req.body.birthday;
    user.phone = req.body.phone;
    user.language = req.body.language;
    user.currency = req.body.currency;
    user.myCity = req.body.myCity;
    user.school = req.body.school;
    user.job = req.body.job;
    user.address = req.body.sample5_address;
    user.companyEmail = req.body.companyEmail;
    user.admin = req.body.admin;

    if(req.body.password === req.body.passwordConfirm){
      if(req.body.password){ // 수정할 때도 hash 로
        user.password = user.generateHash(req.body.password);
      }
    }

    user.save(function(err, user){
      if(err){
        return next(err);
      }
      req.flash('success', '회원 정보가 수정되었습니다');
      res.redirect('/');
    });
  })
});

module.exports = router;
