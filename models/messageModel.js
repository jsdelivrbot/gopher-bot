var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema(
  {
    user: String,
    message: {type: String, unique: true},
    channel: String,
    tags: [String],
    time_send: String,
    link: String
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', messageSchema);