const express = require('express')
const html = require('./routes')
const apiRoute = require('./routes/api')

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.use('/',html)
app.use('/api',apiRoute)

app.listen(PORT, () => {
    console.log(`port listening on port ${PORT}`)
})