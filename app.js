require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const app = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.set('layout', './layouts/layout')

app.use(express.static('public'))
app.use(express.urlencoded({limit: '10mb', extended: false}))
app.use(expressLayouts)
app.use(methodOverride('_method'))

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log('Connected successfuly to database ...')
})
.catch((err) => {
    console.error(`***DB Error***\n\tcode: ${err.code}\n\tcodeName: ${err.codeName}\n\tmessage: ${err.message}\n***End of Error***`)
})

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is up and running on port ${process.env.PORT || 3000}`)
})