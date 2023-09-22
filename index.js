console.clear()

function ToCrud() {
    window.location.href = './a_project/log.html';
}

const { log } = require("console")
const { Route } = require("express") // from flask import flask
const express = require("express")
const fs = require("fs")

const server = express()
const router = express.Router()

server.use(express.json({ extended: true }));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const readFile = () => {
    const json_ = fs.readFileSync('./data/items.json', 'utf-8')
    return JSON.parse(json_)
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)

})

router.post('/', (req, res) => {
    const currentContent = readFile()
    const { user, senha, email } = req.body

    if (user in currentContent[0]) {
        res.send("USUARIO EXISTENTE")
    } else {
        currentContent[0][user] = { senha: senha, email: email, id: Object.keys(currentContent).length }

        fs.writeFileSync('./data/items.json', JSON.stringify(currentContent), 'utf-8')
        res.send(currentContent[0])
    }

})


server.use(router);

server.listen(3000, () => {
    console.log("rodando servidor !!")

});