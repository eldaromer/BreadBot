const Discord = require('discord.js');
const client = new Discord.Client();
const Config = require('./config');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/guilds.json');
const guilds = low(adapter);
const parser = require('./commandparse')(guilds, client);

client.on('ready', () => {
    console.log("Logged in as " + client.user.tag);
    if (!guilds.has('guilds').value()) {
        guilds.set('guilds', {}).write();
    }
    client.guilds.tap(guild => {
        if (!guilds.has('guilds.' + guild.id).value()) {
            guilds.set('guilds.' + guild.id, {}).write();
        }
    });
});

client.on('message', msg => {
    if (msg.content.charAt(0) === '~') {
        parser(msg);
    }
});

client.login(Config.token);
