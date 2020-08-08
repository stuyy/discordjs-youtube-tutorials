var mc = require('minecraft-protocol');
var client = mc.createClient({
  host: process.env.MC_HOST,   // optional
  port: process.env.MC_PORT,
  username: process.env.MC_USERNAME
});
const chatEvents = require('./Events');

client.on('chat', function(packet) {
  // Listen for chat messages and echo them back.
  var jsonMsg = JSON.parse(packet.message);
  if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    if(username === client.username) return;
    // client.write('chat', { message: 'A message was sent' });
    chatEvents.emit('mcMessage', username, msg);
  }
});

chatEvents.on('discordMessage', message => {
  client.write('chat', {
    message: `From Discord: ${message.author.username}#${message.author.discriminator}: ${message.content}`
  });
});
