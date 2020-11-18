const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    since: {
        type: Date,
        required: true
    },
    plan: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    banner: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

const Customer = mongoose.model("Customer", CustomerSchema)

module.exports = Customer