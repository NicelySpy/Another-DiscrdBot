module.exports = {
    name: "accept",
    description: "Accept a call!",
    category: "globalchat",
    run: async(bot, message, args) => {
        if(bot.globalChat.guilds.get(message.guild.id)) return message.channel.send(`There is already a call going on in this guild! Join the party over at <#${bot.globalChat.channels.get(message.guild.id)}>`)
        if(!args[0]) return message.channel.send(`You must specify the guild id!`)
        if(bot.globalChat.calls.get(args[0])) return message.channel.send(`Another guild has already picked up this call!`)
        bot.globalChat.calls.set(message.guild.id, true)
        bot.globalChat.channels.set(message.guild.id, message.channel.id)
        const acceptGuild = message.channel.createMessageCollector(ch=>ch.channel.id==message.channel.id&&!ch.author.bot,{ time: 60000 * 10 })
        const originalGuild = bot.channels.cache.get(bot.globalChat.channels.get(args[0])).createMessageCollector(ch=>ch.channel.type=="text"&&!ch.author.bot,{ time: 60000 * 10 })
        bot.globalChat.collectors.set(message.guild.id, acceptGuild)
        bot.globalChat.collectors.set(args[0], originalGuild)
        bot.globalChat.guilds.set(message.guild.id, true)
        bot.globalChat.guilds.set(args[0], true)
        bot.globalChat.guildsSaved.set(message.guild.id, args[0])
        bot.globalChat.guildsSaved.set(args[0], message.guild.id)
        bot.channels.cache.get(bot.globalChat.channels.get(args[0])).send(`A conversation has started with ${message.guild.name}`)
        message.channel.send(`Your conversation has started!`)
        acceptGuild.on('collect',async(m) => {
            acceptGuild.stop("content")
        })
        originalGuild.on('collect',async(m) => {
            originalGuild.stop("content")
        })
        acceptGuild.on('end', async(collected, reason) => {
            bot.channels.cache.get(bot.globalChat.channels.get(args[0])).send(`**${collected.first().author.tag}**: ${collected.first().content}`)
        })
        originalGuild.on('end',async(collected, reason) => {
            message.channel.send(`**${collected.first().author.tag}**: ${collected.first().content}`)
        })
    }
}