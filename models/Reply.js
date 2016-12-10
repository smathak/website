var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    content: String,
    reply_nickname: String,
    date: {type: Date, default: Date.now},
    hostId: String
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;