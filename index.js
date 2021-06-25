const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
});

client.once("ready", () => {
    console.log(`${client.user.username} esta listo y prendido `)
    client.user.setActivity(`${config.prefix}help`, { type: "WATCHING"});
});

client.on("message", async message => {
    const prefix = (config.prefix);
    if(message.author.bot) return;
    if(!message.guild) return;
    let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if(message.content.match(RegMention)){
        return message.channel.send(new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`<:rei_ping:847273113455427604> Hola mi prefijo es \`${prefix}\` puedes usar \`${prefix}help\` para ver mis comandos <:rei_ping:847273113455427604>`))
    }
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command)
        command.run(client, message, args);
});

client.login(config.token);
