module.exports = {
  name: "scout",
  description: "Scouts the indicated player",
  execute(message, args) {
    console.log(args);
    var region = "na";
    var summonerName = args[3]
    if (!args[3]) {
      summonerName = args[2];
    } else {
      region = args[2];
    }
    region = region.toLowerCase();
    message.channel.send(`https://www.leagueofgraphs.com/summoner/${region}/${summonerName}`);
  },
};
