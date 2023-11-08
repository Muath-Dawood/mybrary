require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.set('layout', './layouts/layout')

app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(expressLayouts)
app.use(methodOverride('_method'))

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log('Connected successfuly to database ...')
})
.catch((err) => {
    console.error(`***DB Error***\n\tcode: ${err.code}\n\tcodeName: ${err.codeName}\n\tmessage: ${err.message}\n***End of Error***`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is up and running on port ${process.env.PORT || 3000}`)
})