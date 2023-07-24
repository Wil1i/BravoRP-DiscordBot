const config = require("../configs/config.json")

module.exports = (client, message) => {
  const messageArry = message.content.split(" ");
  const cmd = messageArry[0].replace(config.prefix, "");

  if (client.commands.has(cmd)) {
    const grabCommand = client.commands.get(cmd);

    return grabCommand.execute(client, message);
  }
}