const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const db = require("quick.db")
const { get } = require("superagent");
const ms = require("pretty-ms");
const { Collection } = require('discord.js')
const Timeout = new Collection();
const config = require("../config.js")

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = client.config.settings.prefix;

  if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {

  if(message.mentions.has(client.user.id)) {
      const embed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`Wrong???`)
          .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
      message.channel.send(embed)

}
  }


  let prefix1 = db.get(`prefix_${message.guild.id}`) 
  if(prefix1 === null) prefix1 = prefix;

  if (!prefix1 || !message.content.startsWith(prefix1)) return;
  const args = message.content
    .slice(prefix1.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
 
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return message.react('❌');


  if (!message.guild.me.hasPermission("EMBED_LINKS"))
    return message.reply("The bot does not have the embed message permissions!");
  if (command.perm && !client.config.dev.includes(message.author.id)) {
    let index = false;
    command.perm.forEach(async perm => {
      if (perm == "dev" && !client.config.dev.includes(message.author.id)) {
        const errPerms = new MessageEmbed()
        .setColor("RED")
        .setDescription('This command is intended for developers')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        index = true;
        return message.reply(errPerms);
      } else if (perm != "dev" && !message.member.hasPermission(perm)) {
        const errPerms = new MessageEmbed()
        .setColor("RED")
        .setDescription(`You have no permissions **(${perm})**, to use this command!`)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        index = true;
        return message.reply(errPerms);
      }
    });
    if (index) return;
  }

  if (command.botperm) {
    let index = false;
    command.botperm.forEach(async perm => {
      if (perm != "dev" && !message.guild.me.hasPermission(perm)) {
        const errPerms = new MessageEmbed()
        .setColor("RED")
        .setDescription(`The bot has no permissions [${perm}](${message.url})`)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        return message.reply(errPerms);
        index = true;
      }
    });
    if (index) return;
  }

  if (command) {
    if(Timeout.has(`${command.name}${config.dev}`)) {
      command.run({client, message, args, prefix, command, MessageEmbed})
      return
    }
    if(command.timeout) {
        if(Timeout.has(`${command.name}${message.author.id}`)) {
          
          const embed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`Command **(${command.name})** you will be able to use for **(${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})})**`)
          .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        
          return message.channel.send(embed)

        }
        command.run({client, message, args, prefix, command, MessageEmbed})
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
        setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
        }, command.timeout)
    } else command.run({client, message, args, prefix, command, MessageEmbed})
}
};
