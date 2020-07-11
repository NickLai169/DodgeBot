module.exports = {
  name: "scout",
  description: "Scouts the indicated player",
  execute(message, args, APIkey) {

    const fetch = require("node-fetch");
    const https = "https://"
    const servers = {"br": "br1", "eune": "eun1", "euw": "euw1", "jp": "jg1", "kr": "kr", "lan": "lan1",
    "las": "la2", "na": "na1", "oce": "oc1", "ru": "ru", "tr": "tr1"};
    const riotAPI = ".api.riotgames.com/";
    const argument = args.split(" ");


    //Check to see if the first element is a region
    if (Object.keys(servers).includes(argument[1].toLowerCase())) {
      var region = argument[1].toLowerCase();
      argument.splice(0, 1);
    } else {
      var region = "na";
    }
    argument.splice(0, 1);
    argument.splice(-1, 1);
    const summonerName = argument.join(" ");


    console.log(`Searching for ${argument.join(" ")} in region ${region}`);

    //Now we're gonna start using the API
    const getSummoner = `${https + servers[region] + riotAPI}/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`
    try {
      fetch(getSummoner, {
        method: "GET",
        headers: {
          "X-Riot-Token": APIkey
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          message.channel.send("Aww... I couldn't find them ;(");
          throw "couldn't find this guy"
        }
      })
      .then(summonerData => {
        var info = `${https + servers[region] + riotAPI}/lol/league/v4/entries/by-summoner/${summonerData.id}`;
        return info;
      })
      .then(getRanking => {
        fetch(getRanking, {
          method: "GET",
          headers: {
            "X-Riot-Token": APIkey
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            message.channel.send("Uuhh... Summoner ID issue...??? Rito please?!?!");
            throw "response is not ok";
          }
        })
        .then(files => {
          var queueType;
          var rankedData = files.find(player => {
            queueType = " Solo/Duo";
            return player.queueType === "RANKED_SOLO_5x5";
          })
          console.log("This is rankedData:");
          console.log(rankedData);
          if (!rankedData) {
            rankedData = files.find(player => {
              queueType = " Flex"
              return player.queueType === "RANKED_FLEX_SR";
            })
          }
          if (!rankedData) {
            console.log("They don't play shit!")
            message.channel.send(`${argument.join(" ")} is a filthy casual and doesn't play ranked >:)`);
            return;
          }

          console.log(rankedData);

          var retString = "";
          retString += argument.join(" ");
          retString += `\nWin rate: ${Math.round((rankedData.wins/(rankedData.wins + rankedData.losses)) * 1000)/10}% (${rankedData.wins} wins: ${rankedData.losses} losses)`
          retString += `\nRank: ${rankedData.tier} ${rankedData.rank} ${rankedData.leaguePoints}LP | ${queueType}`;

          //Checking game mode
          message.channel.send(retString);
        })
      })
    } catch (e) {
      console.log(e);
    }
    /* This part is just linking the summoner.
    message.channel.send(`https://www.leagueofgraphs.com/summoner/${region}/${summonerName}`);
    */
  },
};
