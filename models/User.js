var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nickname:String,
    email:String,
    password:String,
    gender: String,
    birthday: String,
    language: String,
    currency: String, 
    myCity: String,
    introduction: String,
    school: String,
    job: String,
    phone: String,
    companyEmail: String,
    address: String, 
    time: String,
    admin: String,
    date : { type:Date, default:Date.now }
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

// userSchema 에 새로운 메소드 generateHash를 만들고 비밀번호를 형식 매개변수로 받음 
userSchema.methods.generateHash = function(password){
  var salt = bcrypt.genSaltSync(10); 
  return bcrypt.hashSync(password, salt);
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // 매개벼수로 들어온 password와 이 객체의 password를 비교 
};


var User = mongoose.model('User', userSchema);

module.exports = User;