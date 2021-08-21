const Discord = require ("discord.js");

const Commmand = require("./Command")

const intents = new Discord.Intents(32767);

class Client extends Discord.Client {
    constructor (options) {
        super({intents})
        /**
         *
         * @type {Discord.Collection<string, Command>}
         */
        this.commands = new Discord.Collection();
    }
}

module.exports = Client;
