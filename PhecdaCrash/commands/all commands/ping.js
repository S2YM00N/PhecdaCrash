
const fs = require('fs');
const path = require('path');
const ping = require('ping');
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name : 'ping',
    aliases: ['p'],
    timeout: 5000,
    run: async ({client, message, args, MessageEmbed}) => {

      const host = args.join(" ").split(":").slice(0,1)
      const port = message.content.split (":")[1]
  
      ping.sys.probe(host, function(isAlive){
        var msg_dd = isAlive ? `responding 🟢` : `not responding 🔴`
        var msg_bb = isAlive ? `${host}` : `${host}`

    let cipa1 = new MessageEmbed()

    .setColor("PURPLE")
    .setDescription(`Correct usage: **($ping <host:port>)**`)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
  
    if(!args[0]) return message.channel.send(cipa1)

    let help = new MessageEmbed()
        
    .setThumbnail("")
    .setColor("PURPLE")
    .setDescription(`Host name: **(${msg_bb})**\nAnswer: **(${msg_dd})**\nPing: **(${client.ws.ping}ms => your ping)**`)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))

    message.channel.send(help)
    })
  }
}