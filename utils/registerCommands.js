const fs = require("fs")

module.exports = (client) => {
  const commandsDir = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

  commandsDir.forEach(file => {
    const command = require(`../commands/${file}`);

    if (command.execute && command.name) {
      client.commands.set(command.name, command);
      console.log(`[REGISTERING] Command ${command.name} successfully registered`);
    } else {
      console.log(`[REGISTRING] Can't register ${command} command`);
    }
  })
}