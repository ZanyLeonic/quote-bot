const { EmbedBuilder, Colors } = require('discord.js');

const permissionErrorEmbed = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ You do not have permission to use this command!');

const errorEmbed = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ An error occured!');

const emptyMessage = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ No text to quote!');

const diffServerError = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ You can only quote messages from this server!');

const noCommandEmbed = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ This command does not exist!');

const quoteError = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ Error saving embed');

const noQuoteError = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ There are no saved quotes!');

const notYourList = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ You didn\'t send this command, please use /listall');

const delConfirmation = new EmbedBuilder()
	.setColor(Colors.Orange)
	.setTitle('⚠️ To delete all quotes, please press confirm');

const delConfirmed = new EmbedBuilder()
	.setColor(Colors.Green)
	.setTitle('✅ All quotes deleted!');

const delCancelled = new EmbedBuilder()
	.setColor(Colors.Orange)
	.setTitle('✅ Deletion cancelled');

const delTimeOut = new EmbedBuilder()
	.setColor(Colors.DarkOrange)
	.setTitle('⚠️ Confirmation timed out');

const invalidQuoteId = new EmbedBuilder()
	.setColor(Colors.Red)
	.setTitle('⚠️ Invalid Quote ID');

const exportSuccess = new EmbedBuilder()
	.setColor(Colors.Green)
	.setTitle('Exported quotes as CSV')
	.setDescription('A CSV file with all quotes is attached above!');

const multiQuoteFind = (wordToFind, formattedQuotesList) => new EmbedBuilder()
	.setColor(Colors.Green)
	.setTitle(`:mag_right: Quotes containing "${wordToFind}"`)
	.setDescription(formattedQuotesList);

function noQuoteWordError(word) {
	return new EmbedBuilder()
		.setColor(Colors.Red)
		.setTitle(`⚠️ No quotes found containing "${word}"`);
}

function oneQuoteSuccess(content, author, count) {
	return new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle('✅ Quote Saved')
		.setDescription(`"${content}" - ${author}`)
		.setFooter({ text: `Quote #${count}` });
}

function oneQuoteFind(content, author, count) {
	return new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle(`:mag_right: Quote #${count + 1}`)
		.setDescription(`"${content}" - ${author}`);
}

function oneDelete(quoteid, content, author) {
	return new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle(`✅ Quote #${quoteid + 1} deleted!`)
		.setDescription(`"${content}" - ${author}`);
}

function allQuotesAuthor(author, formattedQuotes) {
	return new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle(`Quotes by ${author}`)
		.setDescription(formattedQuotes);
}

function quoteAuthorNotFound(author) {
	return new EmbedBuilder()
		.setColor(Colors.Red)
		.setTitle(`Quotes by ${author}`)
		.setDescription('No quotes found by this author!');
}

function leaderboardQuotes(limit, people) {
	return new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle(`Leaderboard - Top ${limit} Quotes`)
		.setFields()
}

module.exports = {
	permissionErrorEmbed,
	errorEmbed,
	emptyMessage,
	diffServerError,
	noCommandEmbed,
	quoteError,
	noQuoteError,
	notYourList,
	delConfirmation,
	delConfirmed,
	delCancelled,
	delTimeOut,
	invalidQuoteId,
	exportSuccess,
	multiQuoteFind,
	noQuoteWordError,
	oneQuoteSuccess,
	oneQuoteFind,
	allQuotesAuthor,
	quoteAuthorNotFound,
	oneDelete,
};