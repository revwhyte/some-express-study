const express = require('express')
const customerModel = require('../models/CustomerModel')

const app = express()

app.get('/customers', async (req, res) => {
    console.log(`requested /customers`)
    const customers = await customerModel.find({})

    try {
        res.send(customers)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = app