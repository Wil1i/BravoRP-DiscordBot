const Discord = require("discord.js");

const config = require("./configs/config.json");

const client = new Discord.Client()

// Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"

playing = false

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

require("./utils/registerCommands")(client)
require("./utils/registerEvents")(client)

require("./restAPI/index")

client.login(config.BotToken);

module.exports.client = client