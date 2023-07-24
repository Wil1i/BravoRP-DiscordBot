module.exports = {
    name : "test",
    description : "This is test command",
    async execute (client, message) {
        await message.channel.send("Test command!")
    }
}