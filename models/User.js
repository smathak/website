var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nickname:String,
    email:String,
    password:String,
    date : { type:Date, default:Date.now }
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;