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
    let idUser = '0' + String(Object.keys(currentContent[0]).length);


    if (user in currentContent[0]) {
        res.send("USUARIO EXISTENTE");
    } else {
        currentContent[0][user] = { senha: senha, email: email, id: idUser };
        currentContent[1][idUser] = { "nome": String(nome), "publications": {} }

        fs.writeFileSync(jsonPath, JSON.stringify(currentContent), 'utf-8');
        res.send(currentContent[0]);
    }
});

/* publications route*/
router.post('/newpublicationsAPI', (req, res) => {
    const currentContent = readFile();
    const { txtid, userid, txt } = req.body;

    currentContent[1][userid][txtid] = { txtid: txtid, txt: txt }
    fs.writeFileSync(jsonPath, JSON.stringify(currentContent), 'utf-8')

    res.send('enviado com sucesso')
});


server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!!`);
});