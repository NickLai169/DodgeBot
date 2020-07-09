module.exports = {
  name: "scout",
  description: "Index function that activates that other scout functions",
  execute(message, args, APIkey) {
    if (args.includes(",")) {
      bot.commands.get("scoutMultiple").execute(message, args, APIkey);
    } else if (args.includes("joined the lobby")) {
      bot.commands.get("scoutChampSelect").execute(message, args, APIkey);
    } else {
      bot.commands.get("scoutSingle").execute(message, args, APIkey);
    }
  },
};
