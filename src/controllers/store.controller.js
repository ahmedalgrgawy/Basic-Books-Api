var queries = require('../db/queries')
var dbConnection = require('../db/connection')
var generator = require('../utils/generator')

exports.getStoreList = async (req, res) => {

    try {

        var storeQuery = queries.queryList.GET_STORE_LIST_QUERY

        var data = await dbConnection.dbQuery(storeQuery);

        return res.status(200).send(JSON.stringify(data.rows))

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to load list' })
    }

}

exports.saveStoreList = async (req, res) => {

    try {

        var storeCode = generator.generateStoreCode()
        var storeName = req.body.storeName;
        var address = req.body.address;
        var createdBy = "admin"
        var createdOn = new Date()

        if (!storeName || !address) {
            return res.status(500).send({ error: "storeName and address is Required" })
        }

        var values = [storeName, storeCode, address, createdBy, createdOn]

        var storeQuery = queries.queryList.SAVE_STORE_LIST_QUERY

        await dbConnection.dbQuery(storeQuery, values);

        return res.status(201).send({ message: "Store List Saved" })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to save list' })
    }
}