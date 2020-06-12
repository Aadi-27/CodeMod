const { MessageEmbed } = require('discord.js');
const { colors } = require('../json/config.json');
const { formatDate } = require('../helpers/index');
const { messageErrorAsync } = require('../helpers/message');

module.exports = {
    name: 'serverInfo',
    description:
        'This command sends information about the server like no.of members, createdAt, etc',
    guildOnly: true,
    aliases: ['serverinfo'],
    usage: ' ',
    execute: async (message, args) => {
        let serverEmbed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s Info`)
            .setColor(colors.green)
            .setThumbnail(message.guild.iconURL())
            .addField('\u200b', '\u200b')
            .addField('Server Name:', message.guild.name, true)
            .addField('Server created at:', formatDate(message.guild.createdAt), true)
            .addField('You joined on: ', formatDate(message.member.joinedAt), true)
            .addField('Total members: ', message.guild.memberCount, true);

        message
            .delete()
            .catch(() =>
                console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
            );
        messageErrorAsync(message, serverEmbed, `<@!${message.author.id}>, I can't send the embed`);
    },
};
