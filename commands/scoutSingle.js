module.exports = {
  name: "scout",
  description: "Scouts the indicated player",
  execute(message, args, APIkey) {
    const argument = args.split(" ");

    //Check to see if the first element is a region
    const servers = ["br", "eune", "euw", "jp", "kr", "lan", "las", "na", "oce", "ru", "tr", "sea"];
    if (servers.includes(argument[1].toLowerCase())) {
      var region = argument[1];
      argument.splice(0, 1);
    } else {
      var region = "na";
    }

    argument.splice(0, 1);
    argument.splice(-1, 1);

    const summonerName = argument.join("+");
    message.channel.send(`https://www.leagueofgraphs.com/summoner/${region}/${summonerName}`);

    console.log(APIkey);
  },
};
