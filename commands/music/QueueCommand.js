const commando = require('discord.js-commando');
const discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = {
    seek: 0,
    volume: 1
}

var musicQueue = [];

module.exports = class QueueCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Queue a song for the bot to play.',
            argsType: 'single'
        })
    }
    async run(msg, youtubeUrl) {
        let embed = new discord.RichEmbed();
        if(musicQueue.some(url => url === youtubeUrl)) {
            embed.setDescription("Url is already in queue.");
        }
        else if(ytdl.validateURL(youtubeUrl)) {
            musicQueue.push(youtubeUrl);
            let vc = msg.guild.channels.find(ch => ch.name.toLowerCase() === 'music' && ch.type === 'voice');
            if(vc && vc.connection) {
                if(!vc.connection.speaking) {
                    await this.playSong(vc.connection, msg);
                }
                else {
                    console.log(musicQueue);
                }
            }
        } else {
            embed.setDescription("Invalid YouTube URL!");
        }
    }

    async playSong(connection, msg) {
        const stream = ytdl(musicQueue[0], { filter: 'audioonly'});
        console.log(musicQueue[0])
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on('start', () => {
            msg.channel.send("Playing song...");
        });
        
        dispatcher.on('end', () => {
            console.log("Finished song.");
            musicQueue.shift();
            if(musicQueue.length === 0) {
                console.log("No more songs to be played...");
            }
            else {
                setTimeout(() => {
                    this.playSong(connection, msg);
                }, 500)
            }
        })
    }
}