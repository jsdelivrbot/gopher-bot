var Message = require('../models/messageModel');

module.exports = function (controller, channel) {

    let msgMap = new Map()

    controller.hears(channel.tags, channel.channelId,
        function (bot, message) {
            let data = {}
            console.log(message)

                bot.api.users.info({ user: message.user }, function (error, response) {
                    data.user = response.user.real_name
                    console.log(response)

                    let msg = {
                        user: data.user,
                        message: message.text,
                        channel: channel.channelName,
                        tags: [message.match[0]],
                        time_send: message.event_time
                    };

                    msgMap.set(message.text, msg)

                    bot.reply(message, {
                        attachments: [
                            {
                                title: 'Would you like to push this as an event?',
                                text: `Text: ${message.text}, channel ${data.channel}, user ${data.user}`,
                                callback_id: message.text,
                                attachment_type: 'default',
                                actions: [
                                    {
                                        "name": "yes",
                                        "text": "Yes, please",
                                        "value": "da",
                                        "type": "button",
                                    },
                                    {
                                        "name": "no",
                                        "text": "No dont",
                                        "value": "nyet",
                                        "type": "button",
                                    }
                                ]
                            }
                        ]
                    });

                })
        });

    controller.on('interactive_message_callback', function (bot, message) {

        console.log(message)

        if (message.actions[0].name === 'yes') {
            let msg = new Message(msgMap.get(message.callback_id))
            msg.save((function (err) {
                if (err) { console.log(err) }
                console.log("pass")
            }));
            bot.replyInteractive(message, {
                title: 'Sent',
                text: 'See it on the website'
            }, function (err) {

            })
        } else {
            msgMap.delete(message.callback_id)
            bot.replyInteractive(message, {
                title: 'Declined',
                text: 'Not on website'
            }, function (err) {

            })
        }
    })
}