const Discord = require('discord.js');
const client = new Discord.Client();
const talkedRecently = new Set()
const db = require('croxydb')
const fs = require('fs')


client.on('ready', () => {
    console.log(`Aktif!`)
})

client.on('message', async message => {
    if(message){
        if(message.channel.id !== "840945724677160970") return
        let sayı = db.fetch(`sayı.${message.guild.id}`) || 0
        message.guild.channels.create(`destek-${sayı + 1}`).then(async s => {
            db.add(`sayı.${message.guild.id}`, 1)
            let everyone = message.guild.roles.cache.find(r => r.name === `@everyone`)
            s.createOverwrite(everyone, {'VIEW_CHANNEL': false})
            s.createOverwrite(message.author, { 'VIEW_CHANNEL':true, 'SEND_MESSAGES':true });
            s.createOverwrite("840927779892756480", { 'VIEW_CHANNEL':true, 'SEND_MESSAGES':true });
            client.channels.cache.get(s.id).send(
                new Discord.MessageEmbed()
                .setDescription(`**<@&840927779892756480> Destek Sebebi: ${message.content} ile Destek Açıldı!**`,`
                
                
                **Destek Sebebi: ${message.content}**
                **Destek Talebini Kapatmak İçin talep kapat Yazınız**
                `)
            )
            })

    }
})

client.on('message', async message => {
    if(message.channel.id !== "840945724677160970") return 
    message.delete()
})

client.on('message', async message => {
    if(message.content.toLocaleLowerCase() == "talep kapat"){
        if(!message.channel.name.startsWith("destek")) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`**Bu Komut Sadece Destek Taleplerinde Kullanılabilir**`)
        )
        
        message.channel.delete()
    }
})


client.login("NzYzNjc1MDkyMzQwOTY1Mzc3.X37J2g.dhi-y0-S7d0l-na1K-TfV0v9CLo")