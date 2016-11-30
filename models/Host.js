var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostSchema = new Schema({
    title: String,
    explanation: String,
    nation: String,
    city: String,
    address : String,
    fare : String,
    facility : String,
    rule : String,
    date : { type:Date, default:Date.now },
    nickname : String
    // 이미지도 추가 예정 
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Host = mongoose.model('Host', hostSchema);

module.exports = Host;