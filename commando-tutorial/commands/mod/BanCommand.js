const commando = require('discord.js-commando');

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'mod',
            memberName: 'ban',
            description: 'Bans a user from the guild.',
            userPermissions: [
                'BAN_MEMBERS'
            ],
            clientPermissions: [
                'BAN_MEMBERS'
            ],
            argsType: 'multiple',
            argsCount: 2
        })
    }
    async run (commandoMsg, args) {
        args.forEach(id => {
            let user = commandoMsg.guild.members.get(id);
            if(user) {
                user.ban()
                .then(member => console.log('Banned ' + member.user.username))
                .catch(err => console.log(err));
            } else {
                console.log("Member not found.");
            }
        })
    }
}