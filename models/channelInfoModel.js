var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema(
  {
    channelId: String,
    channelName: String,
    tags:[String]
  }, {
      timestamps: true
  }
);

module.exports = mongoose.model('Channel', messageSchema);