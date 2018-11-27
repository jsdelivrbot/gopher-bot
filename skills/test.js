var Message = require('../models/messageModel');

module.exports = function (controller) {
    controller.on('ambient', function(bot, message){
        controller.trigger(message.channel, [bot, message])
    })

    controller.on('interactive_message_callback', function(bot, message){
        controller.trigger(`interactive_message_callback_${message.channel}`, [bot, message])
    })
}