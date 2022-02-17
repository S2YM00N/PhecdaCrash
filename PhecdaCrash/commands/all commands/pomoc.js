const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name : 'help',
    timeout: 5000,
    run: async ({client, message, args, MessageEmbed}) => {

      const embed = new MessageEmbed()
      .setColor("PURPLE")
      .setThumbnail("")
      .setDescription("PhecdaCrasher is a professional minecraft crasher with many features. For testing the durability of your minecraft server.\n\n**($help)**,**($ping)**, **($stop)**, **($methods)**")
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
      return message.channel.send(embed);
    } 
  }