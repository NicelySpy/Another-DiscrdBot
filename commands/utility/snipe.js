const { MessageEmbed } = require('discord.js');
const moment = require('moment')
module.exports={
    name: "snipe",
    description: "Get the most recent deleted message in the channel",
    category: "utility",
    run: async(bot, message, args)=>{
        let snipe = bot.snipes.get(message.channel.id);
        if(!snipe) return message.channel.send(`No snipes in this channel!`)
        let Embed = new MessageEmbed()
        .setTitle(`The most recent snipe in ${message.channel.name} At: ${moment(snipe.date).format("LLLL")}`)
        .setDescription(snipe.content)
        .setColor(`RANDOM`)
        .setAuthor(snipe.tag,snipe.avatar)
        if(snipe.attachment){
            Embed.setImage(snipe.attachment.proxyURL)
            Embed.setFooter(`Image name: ${snipe.attachment.name}`)
        }

        message.channel.send(Embed)
    }
}