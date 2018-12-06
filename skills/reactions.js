var Message = require('../models/messageModel');

module.exports = function (controller) {
    controller.on('reaction_added', function(bot, message){
        console.log('reaction added?')
        console.log(message)

        console.log(message.event.item.channel)
        console.log(message.event.item.ts)

        bot.api.reactions.get({
            channel: message.event.item.channel,
            timestamp: message.event.item.ts
        }, function(error, response){
            console.log('api req here')
            console.log(response)
            let reactions_count = 0
            response.message.reactions.forEach(element => {
                console.log(element)
                reactions_count += element.count
            });
            
            if (reactions_count >4){
                    let cont = {
                        user: message.user,
                        channel: message.team,
                        tags: ["Reacted to"],
                        time_send: message.event_ts,
                        message: response.message.text
                    }
                    dbmsg = new Message(cont)
                    console.log(dbmsg);
                    // dbmsg.save(function (err) {
                    //     if (err) { console.log(err) }
                    //     else {
                    //         console.log("message saved")
                    //     }
                    // })
            }
        }
        )
    })
}