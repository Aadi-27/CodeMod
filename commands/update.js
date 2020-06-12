const Member = require('../server/models/Member');
const { messageErrorAsync, botChannelAsync } = require('../helpers/message');

module.exports = {
    name: 'update',
    description: 'This command updates the users information in the database',
    aliases: ['updateuser'],
    guildOnly: true,
    usage: ' ',
    execute: async (message, args) => {
        if (message.guild.member(message.author)) {
            let returnedMember = await Member.findOne({ discordId: message.author.id });
            if (!returnedMember) {
                message.delete();
                messageErrorAsync(
                    message,
                    "You're not in the database. You can add your details with `add` command",
                    `**<@!${message.author.id}>, you\'re not in the database, add your details with \`add\` command.**`
                );
                return;
            }

            returnedMember.discordId = message.author.id;
            returnedMember.discriminator = `#${message.author.discriminator}`;
            returnedMember.username = message.author.username;
            returnedMember.nickName = message.member.nickname;
            returnedMember.avatar = message.author.avatarURL();
            returnedMember.server = message.guild.name;
            returnedMember.joinedAt = message.guild.joinedAt;
            returnedMember.roles = [...message.member._roles];

            message.delete();

            try {
                await returnedMember.save();
                messageErrorAsync(
                    message,
                    'Successfully updated your details to the database',
                    `**<@!${message.author.id}> updated your details in the database.**`
                );
            } catch (error) {
                botChannelAsync(
                    message,
                    `<@!${message.author.id}>, there was an error while updating your details`
                );
            }
        } else {
            message.delete();

            messageErrorAsync(
                message,
                "Something isn't right, DM <@!487310051393011713> to manually add you to the DB",
                `**<@!${message.author.id}> Something isn't right, DM <@!487310051393011713> to manually add you to the DB**`
            );
        }
    },
};
