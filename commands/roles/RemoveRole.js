const commando = require('discord.js-commando');

module.exports = class RemoveRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            group: 'roles',
            memberName: 'remove',
            description: 'Remove a role from a user',
            userPermissions: [
                'SEND_MESSAGES'
            ],
            clientPermissions: [
                'MANAGE_ROLES'
            ],
            argsType: 'single',
            argsCount: 1
        })
    }
    async run (commandoMsg, roleName) {
        let role = commandoMsg.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        if(role) {
            commandoMsg.member.removeRole(role)
            .then((guildMember) => console.log("Added role " + role.name + " to " + guildMember.user.username))
            .catch(err => console.log(err));
        } else {
            console.log("Role not found.");
        }
    }
}