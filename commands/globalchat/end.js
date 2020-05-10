module.exports={
    name: "end",
    description: "End a call",
    category: "globalchat",
    run: async(bot, message, args) => {
        try{
        if(!bot.globalChat.collectors.get(message.guild.id)) return message.channel.send(`There is no conversation active in this guild!`);
        let OtherGuild = bot.globalChat.guildsSaved.get(message.guild.id)
        if(!bot.globalChat.collectors.get(OtherGuild)) return message.channel.send(`There is no active conversation in the guild you mentioned in the args!`);
        bot.globalChat.collectors.get(message.guild.id).stop("end")
        bot.globalChat.collectors.get(OtherGuild).stop("end")
        message.channel.send(`This conversation is ended!`)
        bot.channels.cache.get(bot.globalChat.channels.get(OtherGuild)).send(`This conversation is ended!`)
        bot.globalchat.calls.delete(message.guild.id)
        bot.globalChat.calls.delete(OtherGuild)
        bot.globalChat.channels.delete(message.guild.id)
        bot.globalChat.channels.delete(OtherGuild)
        bot.globalChat.collectors.delete(message.guild.id)
        bot.globalChat.collectors.delete(OtherGuild)
        bot.globalChat.guilds.delete(OtherGuild)
        bot.globalChat.guild.delete(message.guild.id)
        bot.globalChat.guildsSaved.delete(message.guild.id)
        bot.globalChat.guildsSaved.delete(OtherGuild)
        }catch{}
    }
}