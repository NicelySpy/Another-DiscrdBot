const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kick a specified user from the server",
  category: "moderation",
  usage: "<user id> <reason>",
  run: async (bot, message, args) => {
    if (!args[0])
      return message.channel.send(
        `Please specify who you wish to kick! (Please give the user id or username)`
      );
    let User = message.guild.members.cache.get(args[0]);
    if (!User)
      return message.channel.send(
        `That is not a user in the server! Try again!`
      );
    let Reason = message.content.split(`!kick ${User.id} `);
    if (!args[1])
      return message.channel.send(
        `Please specify a reason! You can't kick someone with out a reason, can you?`
      );
    if (!Reason)
      return message.channel.send(
        `Please specify a reason! You can't kick someone with out a reason, can you?`
      );
    if (!User.kickable)
      return message.channel.send(
        `You can not kick this user, they may have a role higher then me or the same role as me.`
      );
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send(
        `You do not have the KICK_MEMBERS permission!`
      );
    User.kick(Reason);
    const Embed = new MessageEmbed()
      .setTitle(`You have kicked a member!`)
      .setDescription(
        `You have kicked the user ${
          bot.users.cache.get(User.id).username
        } from this server!`
      )
      .setColor(`RANDOM`);
    message.channel.send(Embed);
  },
};
