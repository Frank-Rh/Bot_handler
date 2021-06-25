const Discord = require("discord.js");
const { prefix } = require("../../config.json");
module.exports = {
    name: "ping",
    aliases: ["latncia"],
    description: "Muestra la latencia del bot",
    usage: `${prefix}ping`,
    category: "informacion",
    bperm: "Leer canal, escribir en el canal y usar emojis externos",
    uperms: "No es necesario alguno",
    run: async (client, message, args) => {
        try {
            message.channel.send(`Mi latencia es de ${Math.round(client.ws.ping)} ms`)
        } catch (e) {
            message.channel.send(`Ocurrio un error ${e}`)
        }
    }
}