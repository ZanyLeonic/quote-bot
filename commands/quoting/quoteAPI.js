const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionsBitField } = require('discord.js');
const { addQuote } = require('../../database/addQuote');
const { adminOnlyMode } = require('../admin/permissionToggle');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('quote this')
		.setType(ApplicationCommandType.Message),

	async execute(interaction) {
		console.log('1');
		try {
			console.log('2');
			const messageId = interaction.targetId;

			// Fetch the message using the messageId
			const message = await interaction.channel.messages.fetch(messageId);

			if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) {
				return interaction.reply('You do not have permission to use this command');
			}

			if (!message.content) {
				console.log('No message content to quote.');
				return await interaction.reply({
					content: 'There is no message to quote!',
					ephemeral: true,
				});
			}

			const guildId = interaction.guildId;
			const channelId = interaction.channel.id;
			const creator = `${interaction.user.username}#${interaction.user.discriminator}`;
			const author = message.author;
			const content = message.content;
			const username = `${author.username}#${author.discriminator}`;

			console.log('Quoting message:', content);
			console.log('Quote saved to database.');

			try {
				await addQuote(username, content, guildId, channelId, creator);
				return await interaction.reply('Quote saved!');
			}
			catch (error) {
				console.log('Error occured: ', error);
				return await interaction.reply('Error saving quote!');
			}
		}
		catch (error) {
			console.error('An error occurred:', error);
			return await interaction.reply({
				content: 'An error occurred while processing your request.',
				ephemeral: true,
			});
		}
	},
};