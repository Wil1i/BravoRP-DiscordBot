const axios = require("axios");

const guildInvites = require("../utils/guildInvites")
const config = require("../configs/config.json")

module.exports = (client) => {
  client.channels.cache.get(config.showOffVoiceChannelID)?.join().catch(() => {

    let interval;

    setInterval(() => {

      client.channels.cache.get(config.showOffVoiceChannelID)?.join().then(() => {

        interval.clear()

      }).catch(() => { });

    }, 1000);

  });

  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
      .then(invites => guildInvites.set(guild.id, invites))
      .catch(err => console.log(err));
  });

  setInterval(async function () {

    const statusvc = client.channels.cache.get(config.serverStatusChannelID);

    try {

      const context = await axios(`http://${config.serverIP}/info.json`)
      const geckoTable = await axios(`http://${config.serverIP}/players.json`);

      (context) ?
        statusvc.setName("Server Status: Online🟢")
        :
        statusvc.setName("Server Status: Offline🔴");

      (geckoTable) ?
        client.user.setActivity(`🛠️ ${geckoTable.data.length} Players In V.Beta`, { type: "WATCHING" })
        :
        client.user.setActivity(`🛠️ Server is OFFLINE`, { type: "WATCHING" });

    } catch (error) {
      client.user.setActivity(`🛠️ Server is OFFLINE`, { type: "WATCHING" });
    }

  }, 7000);

  console.log("Bot is online now !")
}