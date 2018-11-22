var Message = require('../models/messageModel');

module.exports = function(controller) {

    controller.hears( ['hello', 'hi', 'greetings'],
    ['direct_mention', 'mention', 'direct_message', 'ambient'],
     function (bot, message) {
         let data = {}
         console.log(message)
         bot.api.channels.info({channel: message.channel}, function(error, response){
             console.log(response.channel)
             data.channel = response.channel.name

             bot.api.users.info({user: message.user}, function(error, response){
                data.user = response.user.real_name
                console.log(response)

                // bot.reply(message, `Text: ${message.text}, channel ${data.channel},
                //  user ${data.user}`)
                 var msg = new Message(
                    {
                        user: data.user,
                        message: message.text,
                        channel: data.channel,
                        tags: ["Test", "not real"],
                        time_send: "12 oclock"
                    });
                    
                //     msg.save(function (err) {
                //         if (err) {console.log(err)} 
                //         console.log("pass")
                //     });

                 bot.reply(message, {
                    attachments:[
                        {
                            title: 'Would you like to push this as an event?',
                            text: `Text: ${message.text}, channel ${data.channel}, user ${data.user}`,
                            callback_id: '123',
                            attachment_type: 'default',
                            actions: [
                                {
                                    "name":"yes",
                                    "text": "Yes, please",
                                    "value": "da",
                                    "type": "button",
                                },
                                {
                                    "name":"no",
                                    "text": "No dont",
                                    "value": "nyet",
                                    "type": "button",
                                }
                            ]
                        }
                    ]
                });


                 
            })             
         })
    });

    controller.on('interactive_message_callback', function(bot, message){
        if (message.actions.name === 'yes'){
            bot.replyInteractive(message,{
                title: 'Sent',
                text: 'See it on the website'
            }, function(err){
                
            } )
        } else {
            bot.replyInteractive(message,{
                title: 'Declined',
                text: 'Not on website'
            }, function(err){
                
            } )
        }
    })
}