const {Schema, model} = require('mongoose')

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthYear: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = model('Author', authorSchema)