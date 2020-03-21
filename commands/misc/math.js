const {calculator} = require('../../functions')
module.exports={
    name: "math",
    category: "misc",
    description: "Does your math homework for you!",
    usage: "<num1> <operator> <num2>",
    run: async(bot,message,args)=>{
        if(!args[0])return message.channel.send(`No num1 specified!`)
        if(!args[1])return message.channel.send(`No operator specified!`)
        if(!args[2])return message.channel.send(`No num2 specified!`)
        message.channel.send(calculator(args[0],args[1],args[2]))
    }
}
