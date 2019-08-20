module.exports = (guilds, client) => {

    let rollbind = (msg, left) => {
        console.log(left);
        msg.guild.channels.tap((channel) => console.log(channel.name))
    };

    let command_dict = {
        'bind': {
            'roll': rollbind
        }
    };

    return (msg) => {
        let command = msg.content.substring(1);
        const chain = command.split(' ');
        let current = command_dict;
        for (let x = 0; x < chain.length+1; x++) {
            console.log(current, chain[x]);
            if (!current) {
                msg.reply('Not a valid command idiot.');
                break;
            }
            if (current instanceof Function) {
                current(msg, chain.slice(x));
                break;
            }
            current = current[chain[x]];
        }
    }
};