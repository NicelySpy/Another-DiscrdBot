const { MessageEmbed } = require('discord.js')
module.exports={
    name: "serverinfo",
    description: "View info on your guild!",
    category: "info",
    run: async(bot, message, args)=>{
        let Embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`*${message.guild.name}'s server info...*`)
        .addField(`Members`,`Members: ${message.guild.members.cache.filter(m => !m.user.bot).size} | Bots: ${message.guild.members.cache.filter(m => m.user.bot).size} | Overall: ${message.guild.memberCount}`,true)
        .addField(`Verification Level`,message.guild.verificationLevel,true)
        .addField(`Roles`,message.guild.roles.cache.size,true)
        .addField(`Channels`,`Text: ${message.guild.channels.cache.filter(ch => ch.type=="text").size} | Voice: ${message.guild.channels.cache.filter(ch => ch.type=="voice").size} | Categories: ${message.guild.channels.cache.filter(ch => ch.type=="category").size} | Overall: ${message.guild.channels.cache.size}`,true)
        .addField(`Owner`,`${message.guild.owner} (${message.guild.ownerID})`,true)
        .addField(`Guild`,`${message.guild.name} (${message.guild.id})`,true)
        .setThumbnail(message.guild.iconURL())
        message.channel.send(Embed)
    }
}