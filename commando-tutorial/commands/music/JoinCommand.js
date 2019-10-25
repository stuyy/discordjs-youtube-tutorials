const commando = require('discord.js-commando');

module.exports = class JoinVoiceChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins a voice channel.'
        })
    }
    async run(msg) {
        let vc = msg.guild.channels.find(ch => ch.name.toLowerCase() === 'music' && ch.type === 'voice');
        if(vc && !vc.connection) {
            await vc.join();
        }
    }
}