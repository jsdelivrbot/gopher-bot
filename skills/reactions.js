module.exports = function (controller) {
    controller.on('ambient', function(bot, message){
        console.log('reaction added?')
        console.log(message)
    })
}