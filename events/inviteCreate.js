const guildInvites = require("../utils/guildInvites")

module.exports = async (client, invite) => {
    guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
}