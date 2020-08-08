# Minecraft & Discord Bidirectional Chat Bot

## About

The tutorial video for this project can be found [here]('https://www.youtube.com/watch?v=XfIPKahZ29E') on my youtube channel. Feel free to follow along!

This program connects a Discord Bot and Minecraft Chat Bot together, allowing messages sent on both platforms to be combined into one chat.

Messages sent from a discord channel (or all channels) will be sent to the Minecraft server's chat by the Minecraft bot. Messages sent on the Minecraft server are sent to a Discord channel (or any channel/s) by the Discord Bot.

## Installation

Clone this repository: `git clone https://github.com/ansonfoong/minecraft-discord-chat-bot.git`

Run: `npm install`

Create a `.env` file and add the following variables:

```
MC_HOST=YOUR MINECRAFT SERVER IP ADDRESS FOR BOT TO LOGIN
MC_PORT=PORT OF MINECRAFT SERVER
USERNAME=USERNAME FOR MINECRAFT ACCOUNT
PASSWORD=THIS IS REQUIRED FOR ONLINE MODE SERVERS
BOT_TOKEN=YOUR DISCORD BOT TOKEN
```

An example of a file could look like this:

```
MC_HOST=somedomainip.com
MC_PORT=22223
USERNAME=stuy
PASSWORD=somepassword
BOT_TOKEN=mybottokenfordiscord
```

### Setting up Minecraft Server

I'm assuming you already have a Minecraft Server, but if you don't, setting one up is easy and I quickly went over it in the tutorial for this project, which you can view [here]('https://www.youtube.com/watch?v=XfIPKahZ29E').

### Discord Channel

Make sure you have a dedicated channel on your server where users can communicate with the users on the Minecraft server.