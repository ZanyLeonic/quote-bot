const { dbClient } = require('./dbFunc');

// By author, id, phrase, all
async function countAllQuotesByAuthor(guildId) {
    try {
        const database = dbClient.db(guildId);
        const quotes = database.collection('quotes');

        console.log(await quotes.countDocuments());

        let data = await quotes.aggregate([
            {
                "$group": {
                    "_id": {
                        "$toLower": "$creator"
                    },
                    "count": {
                        "$sum": 1
                    }
                }
            },
            {
                "$group": {
                    "_id": null,
                    "counts": {
                        "$push": {
                            "k": "$_id",
                            "v": "$count"
                        }
                    }
                }
            },
            {
                "$replaceRoot": {
                    "newRoot": {
                        "$arrayToObject": "$counts"
                    }
                }
            },
            {

            }
        ]);

        return data.toArray();
    }
    catch (error) {
        console.log(`Unable to count quotes on guild ${guildId}: `, error);
        return [];
    }
}

module.exports = {
    countAllQuotesByAuthor,
}