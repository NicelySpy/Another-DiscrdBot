module.exports = {
  name: "call",
  description: "Start a call",
  category: "globalchat",
  run: async (bot, message, args) => {
    if (bot.globalChat.guilds.get(message.guild.id))
      return message.channel.send(
        `There is aleady a call going on in this guild! Join the party over at <#${bot.globalChat.channels.get(
          message.guild.id
        )}>`
      );
    bot.globalChat.guilds.set(message.guild.id, true);
    bot.globalChat.calls.set(message.guild.id, false);
    bot.globalChat.channels.set(message.guild.id, message.channel.id);
    bot.guilds.cache.map((g) => {
      try {
        let channel = g.channels.cache.find((g) => g.name === "phone").id;
        if (g.id == message.guild.id);
        else {
          bot.channels.cache
            .get(channel)
            .send(
              `${message.guild.name} wants to call! Run !accept ${message.guild.id} to call them!`
            );
        }
      } catch {}
    });
    message.react("✅");
  },
};
