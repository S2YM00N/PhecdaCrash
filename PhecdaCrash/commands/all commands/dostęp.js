const Discord = require("discord.js")
const fs = require('fs');
const path = require('path');
const { admin } = require("../../config.js")
const ms = require("ms");
const db = require("quick.db")

module.exports = {
  name : 'acces',
  run: async ({client, message, args, MessageEmbed}) => {
    let perm = new Discord.MessageEmbed()
        
    .setColor("RED")
    .setDescription(`You don't have permissions, you must have role: <@&${admin}>`)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
  
    if(!message.member.roles.cache.has(admin)) {
      return message.channel.send(perm)
    }

    if(args[0] == "add") {
        let oznaczenie = message.guild.member(message.mentions.users.first());
        if(!oznaczenie) return message.channel.send("You need to tag a person");
      
        let normal = message.guild.roles.cache.find(r => r.name === "normal")
        let premium = message.guild.roles.cache.find(r => r.name === "premium")
        let elite = message.guild.roles.cache.find(r => r.name === "elite")

        let czas = args[3];
        if(!czas) return message.channel.send("$acces add @target <normal/premium/elite> <time>`");
        message.delete().catch();

        if(args[2] == "normal") {

            message.channel.send(`Access was correctly granted to **(${oznaczenie})** for **(${czas})**`)
      
            oznaczenie.roles.add(normal)

            db.set(`czas_${oznaczenie.id}`, `${czas}`) 

            let czas1 = db.get(`czas_${oznaczenie.id}`)
            setTimeout(function(){

                oznaczenie.roles.remove(normal);
                db.delete(`czas_${oznaczenie.id}`)
            
              }, ms(czas1));

        }
      
    }
    

  },
};