const twitchJs = require('twitch-js');
require('dotenv').config();

const options = {
    options : {
        debug : true
    },
    connection : {
        cluster : 'aws',
        reconnect : true,
    },
    identity : {
        username : process.env.CHANNEL_NAME,
        password : process.env.TWITCH_PASSWORD
    },
    channels : [
        process.env.CHANNEL_NAME
    ]
};

const client = new twitchJs.client(options);

client.connect();

client.on('connected', (address, port) => {
    client.action(process.env.CHANNEL_NAME, `Hello, ${process.env.CHANNEL_NAME} bot is online :). Be nice.`);
});

client.on('chat', (channel, user, message, self) => {
    if(message === '!game'){
        client.action(process.env.CHANNEL_NAME, `${process.env.CHANNEL_NAME} is playing dota 2.`);
    }
    if(message.toLowerCase().includes('hello')){
        client.action(process.env.CHANNEL_NAME, `Hello, ${user['display-name']}, have a nice time here.`);
    }
});