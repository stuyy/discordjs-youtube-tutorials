const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

client.login(config.TOKEN);

client.on('ready', () => console.log("Bot has logged in."));

client.on('message', async message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase() === '-transcript') {
        await message.delete();
        let messageCollection = new discord.Collection();
        let channelMessages = await message.channel.fetchMessages({
            limit: 100
        }).catch(err => console.log(err));

        messageCollection = messageCollection.concat(channelMessages);

        while(channelMessages.size === 100) {
            let lastMessageId = channelMessages.lastKey();
            channelMessages = await message.channel.fetchMessages({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if(channelMessages)
                messageCollection = messageCollection.concat(channelMessages);
        }
        let msgs = messageCollection.array().reverse();
        let data = await fs.readFile('./template.html', 'utf8').catch(err => console.log(err));
        if(data) {
            await fs.writeFile('index.html', data).catch(err => console.log(err));
            let guildElement = document.createElement('div');
            let guildText = document.createTextNode(message.guild.name);
            let guildImg = document.createElement('img');
            guildImg.setAttribute('src', message.guild.iconURL);
            guildImg.setAttribute('width', '150');
            guildElement.appendChild(guildImg);
            guildElement.appendChild(guildText);
            console.log(guildElement.outerHTML);
            await fs.appendFile('index.html', guildElement.outerHTML).catch(err => console.log(err));

            msgs.forEach(async msg => {
                let parentContainer = document.createElement("div");
                parentContainer.className = "parent-container";

                let avatarDiv = document.createElement("div");
                avatarDiv.className = "avatar-container";
                let img = document.createElement('img');
                img.setAttribute('src', msg.author.displayAvatarURL);
                img.className = "avatar";
                avatarDiv.appendChild(img);

                parentContainer.appendChild(avatarDiv);

                let messageContainer = document.createElement('div');
                messageContainer.className = "message-container";

                let nameElement = document.createElement("span");
                let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                nameElement.appendChild(name);
                messageContainer.append(nameElement);

                if(msg.content.startsWith("```")) {
                    let m = msg.content.replace(/```/g, "");
                    let codeNode = document.createElement("code");
                    let textNode =  document.createTextNode(m);
                    codeNode.appendChild(textNode);
                    messageContainer.appendChild(codeNode);
                }
                else {
                    let msgNode = document.createElement('span');
                    let textNode = document.createTextNode(msg.content);
                    msgNode.append(textNode);
                    messageContainer.appendChild(msgNode);
                }
                parentContainer.appendChild(messageContainer);
                await fs.appendFile('index.html', parentContainer.outerHTML).catch(err => console.log(err));
            });
        }
    }
});