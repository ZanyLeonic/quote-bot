const { SlashCommandBuilder } = require('discord.js');
const { findQuoteByAuthor } = require('../../database/findQuotes');
const { errorEmbed, quoteAuthorNotFound, allQuotesAuthor, noQuoteError } = require('../../embeds');


module.exports = {
	name: 'searchauthor',
	data: new SlashCommandBuilder()
		.setName('searchauthor')
		.setDescription('Search for quotes by a specific author')
		.addStringOption(option =>
			option
				.setName('author')
				.setDescription('What quote do you want to find?')
				.setRequired(true),
		),

	async execute(interaction) {
		const guildId = interaction.guildId;
		const authorToFind = interaction.options.getString('author');

		try {
			const cursor = await findQuoteByAuthor(guildId, authorToFind);

			if (!cursor) {
				await interaction.reply({ embeds: [noQuoteError], ephemeral: false });
			}
			else {
				const quotes = await cursor.toArray();

				if (quotes.length === 0) {
					await interaction.reply([quoteAuthorNotFound(authorToFind)]);
				}
				else {
					let formattedQuotes = '';

					for (const quote of quotes) {
						formattedQuotes += `"${quote.content}" - ${quote.author}\n`;
					}

					await interaction.reply({ embeds: [allQuotesAuthor(authorToFind, formattedQuotes)], ephemeral: false });
				}
			}
		}
		catch (error) {
			await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
			console.log(error);
		}
	},
};