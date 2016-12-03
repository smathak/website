var express = require('express');
var router = express.Router();
var Host = require('../models/Host');
var User = require('../models/User');
var Reservation = require('../models/Reservation');
var Favorite = require('../models/Favorite');
var _ = require('lodash');

// 프로필 페이지 띄우기
router.get('/profile', function(req, res, next) {
    res.render('mypage/profile'); 
});

// 호스팅한 숙소 목록 페이지 띄우기
router.get('/host_list/:nickname', function(req, res, next) {
    Host.find({nickname : req.params.nickname}, function(err, hosts){
        console.log("nickname: ", req.params.nickname);
        res.render('mypage/host_list', {hosts : hosts, messages:req.flash()});
    });
});

// 예약 목록 페이지 띄우기
router.get('/reservation_list/:nickname', function(req, res, next) {
    Reservation.find({guest : req.params.nickname}, function(err, reservations){
          res.render('mypage/reservation_list', {reservations : reservations, messages : req.flash()}); 
    });
  
});

// 예약된 나의 숙소 목록 
router.get('/reserved/:hostnickname', function(req, res, next){
    Reservation.find({host: req.params.hostnickname}, function(err, reservations){
        res.render('mypage/reserved', {reservations : reservations, messages : req.flash()});
    });
});

// 예약 승인
router.put('/permission/:id', function(req, res, next){
    Reservation.findById({_id: req.params.id}, function(err, reservation){
        reservation.answer = "예약이 승인 되었습니다.";
        reservation.save(function(err, reservation){
            req.flash("success", "예약을 승인하셨습니다.")
            res.redirect('back');
        });
    })
});

// 예약 거절
router.put('/refusal/:id', function(req, res, next){
    Reservation.findById({_id: req.params.id}, function(err, reservation){
        reservation.answer = "예약이 거절 되었습니다.";
        reservation.save(function(err, reservation){
            req.flash("danger", "예약을 거절하셨습니다.")
            res.redirect('back');
        });
    })
});

// 예약 취소
router.delete('/cancel/:id', function(req, res, next){
    Reservation.findOneAndRemove({_id:req.params.id}, function(err, reservation){
        if (err) {
          return next(err);
        }
        req.flash('success', "예약을 취소하셨습니다.");
        Reservation.find({}, function(err, reservations){
            res.render('mypage/reservation_list', {reservations : reservations});
        });
    });
});

// 즐겨찾기 목록 띄우기 
router.get('/favorite/:nickname', function(req, res, next){
    Favorite.find({guest: req.params.nickname}, function(err, favorites){
        res.render('mypage/favorite_list', {favorites : favorites});
    });
});

// 즐겨 찾기 삭제
router.delete('/favodelete/:id', function(req, res, next){
    Favorite.findOneAndRemove({_id:req.params.id}, function(err, favorites){
        if(err){
            return next(err);
        }
    });
    Favorite.find({}, function(err, favorites){
        req.flash('succes', '즐겨찾기를 삭제했습니다.');
        res.render('mypage/favorite_list', {favorites : favorites});
    });
});


module.exports = router;