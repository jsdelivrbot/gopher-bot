module.exports = function (controller) {
    controller.on('reaction_added', function(bot, message){
        console.log('reaction added?')
        console.log(message)
        bot.api.reactions.get({
            channel: message.event.item.channel,
            timestamp: message.event.item.timestamp
        }, function(error, response){
            console.log(response)
        }
        )
    })
}