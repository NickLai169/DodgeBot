module.exports = {
  name: "ping",
  description: "Test the ping command :D",
  execute(message, args, APIkey) {
    message.channel.send("Pong. ");
  },
};
