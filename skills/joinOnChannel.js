var ChannelInfo = require('../models/channelInfoModel');


module.exports = function (controller) {

    controller.on('bot_channel_join',
        function (bot, message) {
            let data = {}
            console.log(message)
            bot.api.channels.info({ channel: message.channel }, function (error, response) {

                splitString()

                function splitString() {

                    var tags = response.channel.purpose.value

                    tags = tags.substring(str.indexOf("tags:") + 1)

                    tags = response.channel.purpose.value.split(", ")

                    console.log(response.channel.purpose.value)
                    console.log('WTF' + tags)

                    var channelInfo = new ChannelInfo(
                        {
                            channelId: response.channel.id,
                            channelName: response.channel.name,
                            tags: tags
                        });
                    channelInfo.save(function (err) {
                        if (err) { console.log(err) }
                        console.log("channel info saved")
                    });
                }


            })
        });
}