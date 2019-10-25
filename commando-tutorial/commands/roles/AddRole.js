const commando = require('discord.js-commando');

module.exports = class AddRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'assign',
            group: 'roles',
            memberName: 'assign',
            description: 'Assigns a role to a user',
            userPermissions: [
                'SEND_MESSAGES'
            ],
            clientPermissions: [
                'MANAGE_ROLES'
            ],
            argsType: 'multiple',
            argsSingleQuotes: true
        })
    }
    async run (commandoMsg, roleName) {
        console.log(roleName);
        let role = commandoMsg.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        if(role) {
            commandoMsg.member.addRole(role)
            .then((guildMember) => console.log("Added role " + role.name + " to " + guildMember.user.username))
            .catch(err => console.log(err));
        } else {
            console.log("Role not found.");
        }
    }
}