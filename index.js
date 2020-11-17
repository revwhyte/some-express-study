const express = require('express')
const base = require('./test')
const app = express()
const PORT = 3000

// some data
// let accounts = [
//     {
//       "id": 1,
//       "username": "paulhal",
//       "role": "admin"
//     },
//     {
//       "id": 2,
//       "username": "johndoe",
//       "role": "guest"
//     },
//     {
//       "id": 3,
//       "username": "sarahjane",
//       "role": "guest"
//     }
// ];

// express settings
app.use(express.json())
app.listen(PORT, () => {
    // console.log(base)
    console.log(`Express server currently running on port ${PORT}`)
})


// routes
app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/accounts', (req, res) => {
    res.json(base)
})

app.get('/roles', (req, res) => {
    const roles = []
    
    base.map(rl => {
        if(!roles.find(k => k === rl.role)) {
            roles.push(rl.role)
        }
    })

    if(!roles.length) {
        res.status(500).send(`There are no roles set on accounts registered`)
    } else {
        res.json(roles)
    }
})

app.get('/accounts/:id', (req, res) => {
    const accId = Number(req.params.id)
    const getAcc = base.find(acc => acc.id === accId)

    if(!getAcc) {
        res.status(500).send(`Account not found for this ID.`)
    } else {
        res.json(getAcc)
    }
})

app.get('/roles/:role', (req, res) => {
    const role = req.params.role
    const found = base.filter(acc => acc.role === role)

    if(!found.length) {
        res.status(500).send(`Accounts not found for this role.`)
    } else {
        res.json(found)
    }
})

app.get('/total', (req, res) => {
    if(!base.length) {
        res.status(500).send(`No users registered.`)
    } else {
        res.json({"registered": base.length })
    }
})