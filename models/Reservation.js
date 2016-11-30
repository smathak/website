var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    guest : String, // 예약자 닉네임
    host : String, // 호스트 닉네임
    nation: String,
    city : String,
    address : String,
    checkin : String,
    checkout : String,
    number : Number,
    title: String,
    hostid: String,
    answer: String,
    date : { type:Date, default:Date.now },
    // 이미지도 추가 예정 
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;