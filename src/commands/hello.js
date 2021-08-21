const Command = require("../structures/Command");

module.exports = new Command({
    name: "hello",
    description: "Just says hello",

    async run(message, args, client) {
        message.reply("Hi!")
    }
});
