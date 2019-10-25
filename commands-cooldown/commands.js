var commands = new Map([
    ['fun', 10],
    ['misc', 20],
    ['play', 20],
    ['queue', 25]
]);

var commandCooldown = new Map([
    ['fun', new Map()],
    ['misc', new Map()],
    ['play', new Map()],
    ['queue', new Map()]
]);

var handler = function(message, command) {
    
    let delay = () => {
        setTimeout(() => {
            commandCooldown.get(command).delete(message.author.id);
            message.channel.send(`${message.member} cooldown has expired for ${command} command.`)
        }, commands.get(command) * 1000);
    }

    if(commandCooldown.get(command).has(message.author.id)) {
        let init = commandCooldown.get(command).get(message.author.id);
        let curr = new Date();
        let diff = Math.round((curr-init)/1000);
        let time = commands.get(command);
        message.channel.send(`${time-diff} seconds left for ${command} command.`)
    }
    else {
        if(command === 'fun') {
            // Handle Command
            message.channel.send("Fun Command.");
            commandCooldown.get(command).set(message.author.id, new Date());
            delay();
        }
        else if(command === 'misc') {
            message.channel.send("Misc Command.");
            commandCooldown.get(command).set(message.author.id, new Date());
            delay();
        }
        else if(command === 'play') {
            message.channel.send("play Command.");
            commandCooldown.get(command).set(message.author.id, new Date());
            delay();
        }
        else if(command === 'queue') {
            message.channel.send("queue Command.");
            commandCooldown.get(command).set(message.author.id, new Date());
            delay();
        }
    }
    console.log(commandCooldown)
}
module.exports = { commands, commandCooldown, handler };