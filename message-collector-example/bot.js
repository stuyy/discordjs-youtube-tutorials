require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log("Bot has logged in.");
});

client.on('message', async message => {

    if(message.author.bot) return;
    if(message.content.toLowerCase() === '?listen') {
        
        message.channel.send('bot is collecting messages now...');
        let filter = m => !m.author.bot;
        let collector = new discord.MessageCollector(message.channel, filter);
        let destination = client.channels.get('CHANNEL_ID_GOES_HERE');
        collector.on('collect', (m, col) => {
            console.log("Collected message: " + m.content);
            if(destination) {
                if(m.content.toLowerCase() === '?stop' && (message.author.id === m.author.id)) {
                    console.log("Stopping collector.");
                    collector.stop();
                }
                else {
                    let embed = new discord.RichEmbed()
                        .setTitle("New Message")
                        .setDescription(m.content)
                        .setTimestamp()
                        .setAuthor(m.author.tag, m.author.displayAvatarURL)
                        .setColor('#FFAB32')
                    destination.send(embed);
                }
            }
        });
        collector.on('end', collected => {
            console.log("Messages collected: " + collected.size);
        }); 
    }
    if(message.content.toLowerCase() === '?listen2') {
        message.channel.send("Enter your name");
        let filter = m => m.author.id === message.author.id;
        try {
            let msg = await message.channel.awaitMessages(filter, { maxMatches: 1, time: '10000', errors: ['time'] });
            message.channel.send("Your name " + msg.first().content);
        }
        catch(ex) {
            message.channel.send("You did not specify a name on time.");
        }
    }
});

