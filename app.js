// https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9

var express = require("express");
var app = express();

var ppl = ["Tony","Lisa","Michael","Ginger","Food"];

app.get("/people", (req, res, next) => {
    res.json({
        "people": ppl,
    });
});

app.get("/:id", (req, res, next) => {
    try {
        if(ppl[req.params.id]) {
            res.json({
                "person": ppl[req.params.id],
            });
        }
        else {
            res.status(404).send({ "erro": "id não encontrado" });
        }
    } catch (error) {
        throw error;
    }
});

app.get("/:name", (req, res, next) => {
    let name = req.params.name.trim();
    console.log(name);

    try {
        if(ppl.find(name)) {
            res.json({
                "person": name,
                "id": ppl.indexOf(name),
            });
        }
        else {
            res.status(404).send({ "erro": "id não encontrado" });
        }
    } catch (error) {
        throw error;
    }
});

app.put("/:name", (req, res, next) => {
    let name = req.params.name.trim();
    console.log(name);

    try {
        if(name != '' && !ppl.find(el => el == name)) {
            ppl.push(name);
            console.log(ppl);
            
            res.json({
                "people": ppl,
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    // console.log(req.params.id);
    // res.json(ppl[req.params.id]);
});

app.get("/", (req, res, next) => {
    res.json({
        "message": "Welcome",
    });
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});