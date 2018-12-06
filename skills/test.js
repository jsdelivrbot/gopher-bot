var Message = require('../models/messageModel');
var ChannelInfo = require('../models/channelInfoModel');

module.exports = function (controller) {
    controller.on('ambient', function (bot, message) {
        if (!message.thread_ts) {
            controller.trigger(message.channel, [bot, message])
        } else {

            console.log('thread')

            bot.api.reactions.get({
                channel: message.channel,
                timestamp: message.thread_ts
            }, function (error, response) {

                console.log(response)
                if (response.reply_count > 4) {

                    bot.api.users.info({ user: response.user }, function (error, response2) {

                        ChannelInfo.findOne({channelId: response.channel},(err, res)=>{
                            res.channelName
                            let msg = {
                                user:response2.user.real_name,
                                message: response.message.text,
                                channel: res.channelName,
                                tags: ['Popular thread'],
                                time_send: Math.trunc(response.message.thread_ts),
                                link: response.message.permalink
                            }
                            const msg2 = new Message(msg)
                            console.log(msg2)
                        })
                    })
                }
            })
        }
    })

    controller.on('interactive_message_callback', function (bot, message) {
        controller.trigger(`interactive_message_callback_${message.channel}`, [bot, message])
    })
}