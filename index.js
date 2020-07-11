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
const {token, APIkey} = require("./token.json");

bot.on("message", message => {
  if (message.content.toLowerCase() === "hello DodgeBot") {
    message.reply("HELLO FRAND")
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  var argument = "";
  for (const inputs of args.slice(1)) {
    argument += inputs + " ";
  }

  const command = args[1].toLowerCase();

  //These line actually exectues the code :D
  if (!bot.commands.has(command)) {
    message.reply(`What...? "${command}" is not a real command silly :3`);
    return;
  }

  try {
    bot.commands.get(command).execute(message, argument, APIkey);
  } catch (error) {
    console.error(error);
    message.reply("Put in a real input please >:(")
  }
})

bot.once("ready", () => {
  console.log("DodgeBot online");
})

bot.login(token);
