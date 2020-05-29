const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../functions");
module.exports = {
  name: "avatar",
  description: "Get your own or someone else's avatar",
  usage: "[user mention]",
  category: "fun",
  run: async (bot, message, args) => {
    let Embed = new MessageEmbed();
    let roles = [];
    if (!message.mentions.users.first()) {
      message.member.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`Your avatar!`);
      Embed.setThumbnail(message.author.displayAvatarURL());
      Embed.setColor(`RANDOM`);
      Embed.setDescription(
        `Joined: (MM/DD/YYYY) ${formatDate(message.member.joinedAt)}\nID: ${
          message.author.id
        }\nRoles: ${roles}`
      );
      return message.channel.send(Embed);
    } else {
      let User = message.mentions.members.first();
      User.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`${bot.users.cache.get(User.id).tag}'s avatar!`);
      Embed.setThumbnail(bot.users.cache.get(User.id).displayAvatarURL());
      Embed.setColor(`RANDOM`);
      Embed.setDescription(
        `Joined: (MM/DD/YYYY) ${formatDate(User.joinedAt)}\nID: ${
          User.id
        }\nRoles: ${roles}`
      );
      return message.channel.send(Embed);
    }
  },
};
