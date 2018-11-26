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
            console.log(error)
            console.log(response)
        }
        )
    })
}