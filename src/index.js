const config = require("./data/config.json");

const Client = require('./structures/Client');
const client = new Client();
const Command = require('./structures/Command');

// Load command files
const fs = require('fs');
fs.readdirSync("./src/commands")
    .filter(file => file.endsWith(".js"))
    .forEach(file => {
        /**
         * @type {Command}
         */
        const command = require(`./commands/${file}`);
        console.log(`Command ${command.name} loaded`)
        client.commands.set(command.name, command)
    });

//Just reporting if bot is online
client.on("ready", () => {
    console.log("Bot is online!");
})

// Listen for commands with defined prefix
client.on("messageCreate", message => {
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name === args[0]);
    if (!command) return message.reply(`${args[0]} is not a valid command!`)

    command.run(message, args, client);
})

// Start bot
client.login(config.token);
