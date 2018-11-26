var ChannelInfo = require('../models/channelInfoModel');


module.exports = function (controller) {

    controller.on('bot_channel_join',
        function (bot, message) {
            let data = {}
            console.log(message)
            bot.api.channels.info({channel: message.channel}, function (error, response) {
                
                splitString()
                
                function splitString() {
                tags = response.channel.purpose.split(" ")
                console.log('WTF' + tags)
                
                var channelInfo = new ChannelInfo(
                    {
                        channelId: response.channel.id,
                        chanconsolenelName: response.channel.name,
                        tags: [tags]
                    });
                    channelInfo.save(function (err) {
                        if (err) {console.log(err)} 
                        console.log("channel info saved")
                    });
                }

               
            })
        });
}