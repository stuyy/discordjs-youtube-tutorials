const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const userCreatedPolls = new Map();

client.login(config.TOKEN);
client.on('ready', () => console.log(client.user.tag + " has logged in."));

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase() === '!createpoll') {
        if(userCreatedPolls.has(message.author.id)) {
            message.channel.send("You already have a poll going on right now.");
            return;
        }
        message.channel.send("Enter options. Max 5. Type done when finished.");
        let filter = m => {
            if(m.author.id === message.author.id) {
                if(m.content.toLowerCase() === 'done') collector.stop();
                else return true;
            }
            else return false;
        }
        let collector = message.channel.createMessageCollector(filter, { maxMatches: 5 });
        let pollOptions = await getPollOptions(collector);
        if(pollOptions.length < 2) {
            message.channel.send("Not enough options, must contain 2!");
            return;
        }
        let embed = new discord.RichEmbed();
        embed.setTitle("Your Poll");
        embed.setDescription(pollOptions.join("\n"));
        let confirm = await message.channel.send(embed);
        
        await confirm.react('✅');
        await confirm.react('❎');

        let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
        let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
        if(reaction.emoji.name === '✅') {
            message.channel.send("Poll will begin in 1 seconds.");
            await delay(1000);
            message.channel.send("Vote now!");
            let userVotes = new Map();
            let pollTally = new discord.Collection(pollOptions.map(o => [o, 0]));
            let pollFilter = m => !m.bot;
            let voteCollector = message.channel.createMessageCollector(pollFilter, {
                time: 60000
            });
            userCreatedPolls.set(message.author.id, voteCollector);
            await processPollResults(voteCollector, pollOptions, userVotes, pollTally);
            let max = Math.max(...pollTally.array());
            console.log(pollTally.entries());
            let entries = [...pollTally.entries()];
            let winners = [];
            let embed = new discord.RichEmbed();
            let desc = '';
            entries.forEach(entry => entry[1] === max ? winners.push(entry[0]) : null);
            entries.forEach(entry => desc  += entry[0] + " received " + entry[1] + " votes(s)\n");
            embed.setDescription(desc);

            if(winners.length === 1) {
                message.channel.send(winners[0] + " is the winner!", embed);
            }
            else {
                message.channel.send("We have a draw!", embed);
            }
        }   
        else if(reaction.emoji.name === '❎') {
            message.channel.send("Poll cancelled.");
        }
    }
    else if(message.content.toLowerCase() === '!stopvote') {
        if(userCreatedPolls.has(message.author.id)) {
            console.log("Trying to stop poll.");
            userCreatedPolls.get(message.author.id).stop();
            userCreatedPolls.delete(message.author.id);
        }
        else {
            message.channel.send("You don't have a poll going on right now.");
        }
    }
});

function processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
    return new Promise((resolve, reject) => {
        voteCollector.on('collect', msg => {
            let option = msg.content.toLowerCase();
            if(!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
                userVotes.set(msg.author.id, msg.content);
                let voteCount = pollTally.get(option);
                pollTally.set(option, ++voteCount);
            }
        });
        voteCollector.on('end', collected => {
            console.log("Collected " + collected.size + " votes.");
            resolve(collected);
        })
    });
}

function getPollOptions(collector) {
    return new Promise((resolve, reject) => {
        collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
    });
}

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}