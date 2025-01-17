const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const storeRoute = require('./routes/store.route');
const bookRoute = require('./routes/book.route');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', storeRoute)

app.use('/api', bookRoute)

app.use('/api', userRoute)

app.use('/api', loginRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})

module.exports = app