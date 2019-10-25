const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'mod',
            memberName: 'kick',
            description: 'Kicks a user from the guild.',
            userPermissions: [
                'KICK_MEMBERS'
            ],
            clientPermissions: [
                'KICK_MEMBERS'
            ],
            argsType: 'single'
        })
    }
    async run (commandoMsg, userId) {
        let guild = commandoMsg.guild;
        let member = guild.members.get(userId);
        member.kick('Kicking...')
        .then(m => console.log('kicked'))
        .catch(err => console.log(err));
    }
}