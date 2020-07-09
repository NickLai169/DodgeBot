module.exports = {
  name: "ping",
  description: "Test the ping command :D",
  execute(message, args) {
    message.channel.send("Pong. ");
  },
};
