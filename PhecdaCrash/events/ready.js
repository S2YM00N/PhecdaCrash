
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const fs = require('fs');
const https = require('https');
const { proxyupdate } = require("../config.js");
const message = require("./message.js");

module.exports = client => message => {
  const list = client.guilds.cache.get("839616058016137256");
  console.log(`Zalogowano jako ${client.user.tag}`);
  setInterval(() => {
    const activities_list = [
    `.`,
    `PhecdaTeam.pl`,
    `Bot created by venigz#3308`,
    ];
      
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);

  var url = "https://api.openproxylist.xyz/socks4.txt"
  const file = fs.createWriteStream("socks4_proxies.txt")
  fs.writeFileSync('socks4_proxies.txt', ' ');
  const request = https.get(url, function(response) {
      response.pipe(file)
  });
  const embed = new MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
  .setColor("RED")
  .setDescription(`Proxy installed in the file **(${file.path})**. The next update is coming in an hour`)
  client.channels.cache.get(proxyupdate).send(embed)

  setInterval(() => {
    var url = "https://api.openproxylist.xyz/socks4.txt"
    const file = fs.createWriteStream("socks4_proxies.txt")
    fs.writeFileSync('socks4_proxies.txt', ' ');
    const request = https.get(url, function(response) {
        response.pipe(file)
    });
    const embed = new MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .setColor("RED")
    .setDescription(`Proxy installed in the file **(${file.path})**. The next update is coming in an hour`)
    client.channels.cache.get(proxyupdate).send(embed)
  }, 3600000);
 

};
