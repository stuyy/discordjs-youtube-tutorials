require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const chatEvents = require('./Events');
require('./minecraft');

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.name === 'minecraft') {
        console.log("A message was sent in the Mincraft Channel!");
        chatEvents.emit('discordMessage', message);
    }
});
chatEvents.on('mcMessage', (username, msg) => {
    let minecraftChannel = client.channels.get('channel id goes here');
    minecraftChannel.send(`${username}: ${msg}`);
});