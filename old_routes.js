// routes
app.get('/', (req, res) => {
    let msg = new LogMessage()
    msg.setRoute('/')
    msg.setVerb('GET')
    msg.setResult('OK')

    msg.generateMessage()

    history.log(msg)
    history.logMsg(msg.retrieve())

    console.log(msg.retrieve())
    res.status(200).send("Hello")
})

app.get('/log', (req, res) => {
    res.status(200).json(history.showHistoryMessage())
})

app.get('/users', (req, res) => {
    let msg = new LogMessage()
    msg.setRoute('/users')
    msg.setVerb('GET')
    msg.setResult('OK')

    msg.generateMessage()

    history.log(msg)

    console.log(msg.retrieve())

    res.json(base)
})

app.get('/levels', (req, res) => {
    const levels = []
    
    base.map(rl => {
        if(!levels.find(k => k === rl.level)) {
            levels.push(rl.level)
        }
    })

    // generate log
    let msg = new LogMessage()
    msg.setRoute('/levels')
    msg.setVerb('GET')

    if(!levels.length) {
        msg.setResult('FAILED')
        msg.generateMessage()
    
        history.log(msg)

        res.status(500).send(`There are no levels set on users registered`)
    } else {
        msg.setResult('OK')
        msg.generateMessage()
    
        history.log(msg)

        res.json(levels)
    }
})

app.get('/users/:name', (req, res) => {
    const usrName = req.params.name.toLowerCase()
    const getUsr = base.find(k => k.customer.toLowerCase().includes(usrName))

    if(!getUsr) {
        res.status(500).send(`User not found for this name.`)
    } else {
        res.json(getUsr)
    }
})

app.get('/levels/:level', (req, res) => {
    const lvl = req.params.level
    const found = base.filter(k => k.level.toLowerCase() === lvl.toLowerCase())

    if(!found.length) {
        res.status(500).send(`Users not found for this level.`)
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

// first post try
app.post('/user/new', (req, res) => {
    base.sort((i, j) => i.id <= j.id)

    console.log(req.body)

    let novo = req.body
    let newId = base[base.length - 1].id + 1

    novo.id = newId
    base[base.length] = novo

    console.log(base)
    if(base.length !== newId) {
        res.status(500).send(`New user not registered.`)
    } else {
        res.json(novo)
    }
})