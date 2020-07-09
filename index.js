const Discord = require('discord.js');
const bot = new Discord.Client();

const {prefix} = require("./config.json");
const {token} = require("./token.json");

bot.once("ready", () => {
  console.log("DodgeBot online");
  console.log("prefix: " + prefix);
  console.log("token: " + token);
})

bot.on("message", msg => {
  if (msg.content === "hello") {
    msg.reply("HELLO FRAND")
  }
})

bot.login(token);
