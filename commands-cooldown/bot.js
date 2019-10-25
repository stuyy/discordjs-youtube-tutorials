const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const { handler } = require('./commands');

client.login(config.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
});

client.on('message', message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase().startsWith("?fun")) {
        handler(message, 'fun');
    }
    else if(message.content.toLowerCase().startsWith("?misc")) {
        handler(message, 'misc');
    }
    else if(message.content.toLowerCase().startsWith("?play")) {
        handler(message, 'play');
    }
    else if(message.content.toLowerCase().startsWith("?queue")) {
        handler(message, 'queue');
    }
});