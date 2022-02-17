const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name : 'methods',
    timeout: 5000,
    run: async ({client, message, args, MessageEmbed}) => {

      const embed = new MessageEmbed()
      .setColor("PURPLE")
      .setThumbnail("")
      .setDescription("ELITE: **($ayarume1)**, **($byte1)**, **($out3)**, **($suicide3)**")
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
      return message.channel.send(embed);
    } 
  }