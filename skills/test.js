var Message = require('../models/messageModel');

module.exports = function (controller) {
    controller.on('ambient', function(bot, message){
        controller.trigger(message.channel, [bot, message])
    })
}