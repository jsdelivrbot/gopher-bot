module.exports = function (controller) {
    controller.on('reaction_added', function(bot, message){
        console.log('reaction added?')
        console.log(message)
    })
}