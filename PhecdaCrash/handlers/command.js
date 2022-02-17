const { readdirSync } = require("fs");
module.exports = client => {
  readdirSync("./commands/").forEach(folder => {
    readdirSync(`./commands/${folder}/`).forEach(file => {
	  const dir = `${process.cwd()}/commands/${folder}/${file}`;
      client.loader.load({file, folder, dir});
    });
  });
};
