var ChannelInfo = require('../models/channelInfoModel');


module.exports = function (controller) {

    controller.on('bot_channel_join',
        function (bot, message) {
            let data = {}
            console.log(message)
            bot.api.channels.info({channel: message.channel}, function (error, response) {
                console.log(response.channel.id)
                console.log(response.channel.name)
                console.log(response.channel.purpose)

                var channelInfo = new ChannelInfo(
                    {
                        channelId: response.channel.id,
                        channelName: response.channel.name,
                        tags: [response.channel.purpose.value]
                    });
                    channelInfo.save(function (err) {
                        if (err) {console.log(err)} 
                        console.log("channel info saved")
                    });
            })
        });
}