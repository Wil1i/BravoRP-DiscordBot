const Discord = require("discord.js")

const config = require("../configs/config.json")

module.exports = (client, newState, oldState) => {
    const newUserChannel = newState.channelID;
    const oldUserChannel = oldState.channelID;

    const textChannel = client.channels.cache.get("1122303865711251526");

    const server = client.guilds.cache.get("1011062195838255214");

    let user = client.users.cache.get(newState.id);

    if (
        oldUserChannel == config.showOffVoiceChannelID
        && oldState.id == client.user.id
        && newUserChannel == null
    ) {

        client.channels.cache.get(config.showOffVoiceChannelID)?.join().catch(() => {

            let interval;

            setInterval(() => {

                client.channels.cache.get(config.showOffVoiceChannelID)?.join().then(() => {

                    interval.clear()

                }).catch(() => { });

            }, 1000);
        });

    }

    if (!newUserChannel && oldUserChannel === config.moveToStaffChannelID) {
        if (user.username != client.user.username) {
            textChannel.send(`<@&${config.staffRole}>`, {
                embed: (
                    new Discord.MessageEmbed()
                        .setTitle(server.name)
                        .setColor(config.EmbedNoColor)
                        .setDescription("<@" + newState.id + "> Join Voice <#" + config.moveToStaffChannelID + "> Dad")
                        .setFooter("© | Bravo Bot - 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 Arvin")
                )
            }).then(function (global) {
                // TODO : fix here
                // const cs = client.channels.cache.get("1122038982105112586");
                // const vchanadnel = client.channels.cache.get("1122302393237909514");
                // cs.join().then(connection => {
                //     if (playing !== true) {
                //         dispatcher = connection.play("sabori.mp3");
                //         playing = true
                //     }
                //     dispatcher.on("finish", end => {
                //         vchanadnel.join();
                //         playing = false
                //     });
                // })
            });
        }

        client.users.cache.get('' + newState.id + '').send('<@' + newState.id + ">", {
            "embed": (new Discord.MessageEmbed()
                .setTitle("Staff Team")
                .setColor(config.EmbedNoColor)
                .setFooter("© | Bravo Bot - 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 Arvin")
                .setDescription("Entezar Shoma Dar voice Poshtibani Be Tamami Staff Ha Gozaresh Dade Shod Lotfan Sabor Bashid")
                .setImage("https://cdn.discordapp.com/attachments/842914355343130654/985254239750221834/Untitled-1.png")
            )

        }).catch(error => {
            if (user.username != client.user.username) {
                console.error(`Dm ` + user.username + ` Baste Bod Nashod Pm Bedama!`)
            }
        })
    }
}