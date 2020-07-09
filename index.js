// imports stuff
const fs = require("fs");
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

//dynamically retrieve all my command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}


const {prefix, defaultRegion} = require("./config.json");
const {token} = require("./token.json");

bot.on("message", message => {
  if (message.content === "hello") {
    message.reply("HELLO FRAND")
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args[1].toLowerCase();

  //These line actually exectues the code :D
  if (!bot.commands.has(command)) {
    message.reply(`What...? "${command}" is not a real command silly :3`);
    return;
  }

  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error! >:(")
  }
})

bot.once("ready", () => {
  console.log("DodgeBot online");
  console.log("prefix: " + prefix);
  console.log("token: " + token);
})

bot.login(token);
