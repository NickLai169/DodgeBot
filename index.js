const Discord = require('discord.js');
const bot = new Discord.Client();

const token = "NzMwNTQyMzc1MzE4OTc4NzQx.XwZDDw.54-h8skk7bDOU0HIxOX6hUe0E0I";

bot.on("ready", () => {
  console.log("DodgeBot online")
})

bot.on("message", msg => {
  if (msg.content === "hello") {
    msg.reply("HELLO FRAND")
  }
})


bot.login(token);
