const {MessageEmbed} = require('discord.js')
module.exports=async(message)=>{
    let embed = new MessageEmbed()
    .setTitle(`New message deleted!`)
    .setDescription(`**The user ${message.author.tag} has deleted a message in <#${message.channel.id}>**`)
    .addField(`Content`,message.content,true)
    .setColor(`RED`)
    let channel = message.guild.channels.cache.find(ch=>ch.name==="bot-log")
    if(!channel)return;
    channel.send(embed)

}