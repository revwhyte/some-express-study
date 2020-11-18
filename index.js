const express = require('express')
const mongoose = require('mongoose')
const base = require('./test')
// const customerRouter = require('./routes/CustomerRoutes.js')

const PORT = 3000

const app = express()
app.use(express.json())

// mongoose.connect('mongodb+srv://test:ki1ZCS3lxv8hmfrC@yt.cylad.mongodb.net/anuncios?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// app.use(customerRouter)

// express settings
app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })

// routes
app.get('/', (req, res) => { res.status(200).send("Hello") })

app.get('/users', (req, res) => { res.json(base) })

app.get('/levels', (req, res) => {
    const levels = new Set(base.map(rl => rl.level))

    !levels.length ? res.status(404).send(`There are no levels set on users registered`) : res.json(levels)
})

app.get('/users/:name', (req, res) => {
    const usrName = req.params.name.toLowerCase()
    const getUsr = base.find(k => k.customer.toLowerCase().includes(usrName))

    !getUsr ? res.status(404).send(`User not found for this name.`) : res.json(getUsr)
})

app.get('/levels/:level', (req, res) => {
    const lvl = req.params.level
    const found = base.filter(k => k.level.toLowerCase() === lvl.toLowerCase())

    !found.length ? res.status(404).send(`Users not found for this level.`) : res.json(found)
})

app.get('/total', (req, res) => { !base.length ? res.status(404).send(`No users registered.`) : res.json({"registered": base.length }) })

// first post try
app.post('/user/new', (req, res) => {
    base.sort((i, j) => i.id <= j.id)

    let [novo, newId] = [req.body, base[base.length - 1].id + 1]

    novo.id = newId
    base[base.length] = novo

    console.log(base)
    base.length !== newId ? res.status(404).send(`New user not registered.`) : res.json(novo)
})