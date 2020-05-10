const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json')
const prefix = config.prefix;
const bot = new Discord.Client({disableMentions:'everyone'});
const mongoose = require('mongoose')
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
bot.globalChat = {}
bot.globalChat.calls = new Discord.Collection();
bot.globalChat.channels = new Discord.Collection();
bot.globalChat.collectors = new Discord.Collection();
bot.globalChat.guilds = new Discord.Collection();
bot.globalChat.guildsSaved = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
mongoose.connect("mongodb+srv://Salvage:SalvageDev@cluster0-bsjyv.mongodb.net/Data?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
["command","server"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    require('./events/client/ready')(bot)
})
bot.on('message',async message=>{
    message.member //-- GuildMember based
    message.author //-- User based
    require('./events/guild/message')(bot,message)
})
bot.on('messageUpdate',async(oldMessage,newMessage)=>{
    require('./events/guild/messageUpdate')(oldMessage,newMessage)
})
bot.on('messageDelete',async(message)=>{
    require('./events/guild/messageDelete')(message)
})
const token = require(`./token.json`)
bot.login(token.Token)
