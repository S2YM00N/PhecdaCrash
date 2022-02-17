const Discord = require("discord.js")
const fs = require('fs');
const path = require('path');
const { kanal, rola } = require("../../config.js")
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name : 'stop',
  timeout: 300000,
  run: async ({client, message, args, MessageEmbed}) => {
    var exec = require('child_process').exec
    exec(`pkill java`, (error, stdout, stderr) => {
    });


    let nullping = new Discord.MessageEmbed()
        
    .setColor("PURPLE")
    .setDescription(`All attacks currently made have been stopped`)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))

    message.channel.send(nullping)
    

  },
};