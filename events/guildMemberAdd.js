const Discord = require("discord.js")
const discordButtons = require('discord.js-buttons');

const guildInvites = require("../utils/guildInvites")

module.exports = async (client, member) => {
  console.log(1)
  const disbut = discordButtons()

  var uwulog = client.channels.cache.get(config.logs.invite);
  var wlcChannel = client.channels.cache.get(config.logs.welcome);

  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();

  guildInvites.set(member.guild.id, newInvites);

  try {
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);

    const embed = new Discord.MessageEmbed()
      .setDescription(`member jadid join inja dad!`)
      .addField('Name:', `${member.user.tag}`, true)
      .addField('Tedad member hay inja :', `${member.guild.memberCount}`, false)
      .addField('tedad dafeat estefade shode az in link invite:', `${usedInvite.uses}`, true)
      .addField('Invited by:', `${usedInvite.inviter.tag}`, false)
      .setColor(config.EmbedNoColor)
      .setFooter("© | Bravo Bot - 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 Arvin")
      .setTitle(`link estefade shode : ${usedInvite.url}`);

    uwulog.send(embed)

    let button = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Website')
      .setURL('https://bravorp.ir');

    wlcChannel.send('<@' + member.user.id + ">", {
      "embed": (new Discord.MessageEmbed()
        .setAuthor(`Welcome To BravoRp ${member.user.username}`, member.user.displayAvatarURL({ dynamic: true }))
        .setColor(config.EmbedNoColor)
        .setFooter("© | Bravo Bot - 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 Arvin")
      )
    }).then(m => { m.channel.send(button) });
  } catch (err) { }
}