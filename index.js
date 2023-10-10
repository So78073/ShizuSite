console.clear()
const express = require("express");
const fs = require("fs");
const { url } = require("inspector");

const server = express();
const router = express.Router();

server.use(express.json());

function ToCrud() {
    window.location.href = 'a_project/log.html';
}


// Configurar o CORS para permitir requisições da origem http://127.0.0.1:5500
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const jsonPath = './data/items.json';

const readFile = () => {
    const json_ = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(json_);
}

/* login route */

router.get('/', (req, res) => {

    const content = readFile();
    res.send(content);
});

router.post('/', (req, res) => {
    const currentContent = readFile();
    const { user, senha, email, nome } = req.body;
    let idUser = String(Object.keys(currentContent[0]).length + 1);


    if (user in currentContent[0]) {
        res.send("USUARIO EXISTENTE");
    } else {
        currentContent[0][user] = { senha: senha, email: email, id: idUser };
        currentContent[1][idUser] = { "nome": String(nome), "publications": {}, "seguindo": [], "seguidores": [], "bio": "" };
        currentContent[2][nome] = idUser;


        fs.writeFileSync(jsonPath, JSON.stringify(currentContent), 'utf-8');
        res.send(currentContent[0]);
    }
});

/* publications route*/
router.post('/publiAPI', (req, res) => {

    const currentContent = readFile();
    const { userid, txtid, text } = req.body;

    currentContent[1][userid]['publications'][txtid] = { txt: text, likes: [], Dlikes: [], Compar: [] }
    fs.writeFileSync(jsonPath, JSON.stringify(currentContent), 'utf-8');

});

router.get('/friends', (req, res) => {
    const content = readFile();
    const { nome } = req.query;
    achados = {};

    for (let p in content[2]) {
        if (p.includes(nome)) {
            achados[p] = content[2][p];
        }
    }
    res.send(achados);
});

router.post('/follow', (req, res) => {
    const content = readFile();
    const { currentUser, friendID } = req.body;

    if (content[1][currentUser]['seguindo'].includes(friendID)) {

        const index1 = content[1][currentUser]['seguindo'].indexOf(friendID);

        if (index1 !== -1) {
            content[1][currentUser]['seguindo'].splice(index1, 1); // Remove o amigo que estava sendo seguido
        }

        const index2 = content[1][friendID]['seguidores'].indexOf(currentUser);
        if (index2 !== -1) {
            content[1][friendID]['seguidores'].splice(index2, 1); // Remove o amigo que estava sendo seguido
        }

    } else {
        content[1][currentUser]['seguindo'].push(friendID);
        content[1][friendID]['seguidores'].push(currentUser);
    }

    fs.writeFileSync(jsonPath, JSON.stringify(content), 'utf-8');
});



server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!!`);
});