var ChannelInfo = require('../models/channelInfoModel');


module.exports = function (controller) {

    controller.on('bot_channel_join',
        function (bot, message) {
            let data = {}
            console.log(message)
            bot.api.channels.info(function (error, response) {
                console.log(response.channel.id)
                console.log(response.channel.name)
                console.log(response.channel.purpose)


                var channelInfo = new ChannelInfo(
                    {
                        channelId: response.channel.id,
                        channelName: response.channel.name,
                        channelPurpose: response.channel.purpose
                    });
            })
        });
}