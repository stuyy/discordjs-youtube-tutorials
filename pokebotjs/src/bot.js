require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { getPokemon } = require('./utils/pokemon');
client.login(process.env.BOT_TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('!pokemon')) {
        const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats, 
                weight, 
                name, 
                id, 
                base_experience,
                abilities,
                types
            } = pokeData;
            const embed = new MessageEmbed();
            embed.setTitle(`${name} #${id}`)
            embed.setThumbnail(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
            types.forEach(type => embed.addField('Type', type.type.name, true));
            embed.addField('Weight', weight);
            embed.addField('Base Experience', base_experience);
            message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
            message.channel.send(`Pokemon ${pokemon} does not exist.`);
        }
    }
});

