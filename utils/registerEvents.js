const fs = require("fs")

module.exports = (client) => {
  const eventsDir = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

  eventsDir.forEach(file => {
    const event = require(`../events/${file}`);
    const eventName = file.replace(".js", "")

    client.events.set(eventName, event);

    client.on(eventName, (arg1, arg2, arg3) => {
      event(client, arg1, arg2, arg3);
    });

    console.log(`[REGISTERING] event ${eventName} successfully registered`);
  })
}