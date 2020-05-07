const {MessageEmbed} = require('discord.js')
module.exports=async(message)=>{
    try{
    message.client.snipes.set(message.channel.id,{
        tag: message.author.tag,
        avatar: message.author.displayAvatarURL({ dynamic: true }),
        attachment: message.attachments.first() ? message.attachments.first() : undefined,
        content: message.content,
        date: Date.now()
    })
    let embed = new MessageEmbed()
    .setTitle(`New message deleted!`)
    .setDescription(`**The user ${message.author.tag} has deleted a message in <#${message.channel.id}>**`)
    .addField(`Content`,message.content,true)
    .setColor(`RED`)
    let channel = message.guild.channels.cache.find(ch=>ch.name==="bot-log")
    if(!channel)return;
    channel.send(embed)
    }catch(e){}
}