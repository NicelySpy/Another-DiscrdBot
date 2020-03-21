const {MessageEmbed} = require('discord.js')
const ms = require('ms');
module.exports={
    name: 'giveaway',
    description: 'Create a simple giveaway',
    usage: '<time> <prize>',
    category: 'fun',
    run: async(bot,message,args)=>{
        
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You do not have admin!")
        let timev = message.content.slice(bot.prefix.length+9)
        if(!timev) return message.channel.send('You did not specify your time in MS!')
        let time = parseInt(timev,10)
      if(time< 15000)   return message.channel.send('Your time in MS has to be longer then 15 seconds! (15000 MS)')
    
        let prize = message.content.split(`${time}`).join("").split(`${bot.prefix}giveaway `).join("")
        if(!prize) return message.channel.send("No prize was specified!")
        const Embed = new MessageEmbed()
        .setTitle('New giveaway!')
        .setDescription(prize)
        .setColor('RANDOM')
        .setFooter(`This giveaway is ${ms(time)} long!`)
        let msg = await message.channel.send(Embed)
        await msg.react('🎉')
        function winner(msg){
            
          let winner =   msg.reactions.cache.get('🎉').users.cache.random().id
          return winner
        };
        function rawWinner(msg){
            let winner =   msg.reactions.cache.get('🎉').users.cache.random()
        }

        function reactions(msg){
            return msg.reactions.cache.size
        }
        function reroll(msg){
            return winner(msg)
        }
        setTimeout(() => {
        if(reactions(msg) < 5)return message.channel.send('I can not host a giveaway if less then 5 people have reacted!')
           let win=winner(msg)
               return message.channel.send(`The winner for the giveaway of **${prize}** is <@${win}> !`)
           
        }, time);
    }
}