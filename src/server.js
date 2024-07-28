const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const storeRoute = require('./routes/store.route');

dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', storeRoute)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})