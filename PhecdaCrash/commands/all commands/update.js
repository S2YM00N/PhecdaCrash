const https = require('https');
const moment = require('moment');
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const fs = require('fs');

module.exports = {
    name : 'update',
    aliases: ['upd'],
    timeout: 5000,
    run: async ({client, message, args, MessageEmbed}) => {

    var url = "https://api.openproxylist.xyz/socks4.txt"
    const file = fs.createWriteStream("socks4_proxies.txt")
    fs.writeFileSync('socks4_proxies.txt', ' ');
    const request = https.get(url, function(response) {
        response.pipe(file)
    });
    const embed = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`The file was successfully reloaded \`${file.path}\`.`)
    .setFooter(`Command executed by: ${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    message.channel.send(embed)
},
};