const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Colors } = require('discord.js');

const { countAllQuotesByAuthor } = require('../../database/countQuotes');

module.exports = {
    name: 'topquoted',
    data: new SlashCommandBuilder()
        .setName('topquoted')
        .setDescription('List the top 10 quoted people'),

    async execute(interaction) {
        await interaction.deferReply();

        const guildId = interaction.guildId;
        const timesQuoted = await countAllQuotesByAuthor(guildId);

        const embed = new EmbedBuilder()
            .setColor(Colors.Orange)
            .setTitle(`Top 10 Quoted People on PLACEHOLDER`);

        timesQuoted.map((x, i) => {
            embed.addFields({ name: `${i + 1}. ${x._id}`, value: `${x.count} quotes` });
        })

        interaction.editReply({ embeds: [embed] });
    }
}