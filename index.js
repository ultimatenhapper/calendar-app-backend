const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use('/api/auth', require('./routes/auth'))


app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}...`)
})