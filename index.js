console.clear()
const { Decipher } = require("crypto");
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

    currentContent[1][userid]['publications'][txtid] = { txt: text, likes: [], Dlikes: [], Compar: [], commits: {} }
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

router.post('/friends', (req, res) => {
        const data = readFile();
        const { Cuser, Fuser, IDpost, IDcommit, Type, Func } = req.body;


        if (Func == "POST") {
            if (data[1][Fuser]["publications"][IDpost][Type].includes(Cuser)) {

                const index = data[1][Fuser]["publications"][IDpost][Type].indexOf(Cuser)
                data[1][Fuser]["publications"][IDpost][Type].splice(index, 1);

            } else {
                if (Type == "Compar") {
                    if (data[1][Fuser]["publications"][IDpost]["Compar"].includes(Cuser)) {
                        const index = data[1][Fuser]["publications"][IDpost]["Compar"].indexOf(Cuser)
                        data[1][Fuser]["publications"][IDpost]["Compar"].splice(index, 1);
                    } else {
                        data[1][Fuser]["publications"][IDpost]["Compar"].push(Cuser)
                    }
                } else {
                    const index1 = data[1][Fuser]["publications"][IDpost]["likes"].indexOf(Cuser)
                    const index2 = data[1][Fuser]["publications"][IDpost]["Dlikes"].indexOf(Cuser)

                    data[1][Fuser]["publications"][IDpost]["likes"].splice(index1, 1);
                    data[1][Fuser]["publications"][IDpost]["Dlikes"].splice(index2, 1);

                    data[1][Fuser]["publications"][IDpost][Type].push(Cuser)
                }

            }
        }
        if (Func == "COMMIT") {

            const onlikes = data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['likes'].includes(Cuser)
            const ondlikes = data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['Dlikes'].includes(Cuser)

            if (ondlikes == true || onlikes == true) {
                if (Type == 'likes') {
                    if (onlikes == true) {
                        const index1 = data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['likes'].indexOf(Cuser)
                        data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['likes'].splice(index1, )

                    } else {
                        const index2 = data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['Dlikes'].indexOf(Cuser)
                        data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['Dlikes'].splice(index2, )

                        data[1][Fuser]["publications"][IDpost]['commits'][IDcommit][Type].push(Cuser)

                    }
                }

                if (Type == 'Dlikes') {
                    if (ondlikes == true) {
                        const index1 = data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['Dlikes'].indexOf(Cuser)
                        data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['Dlikes'].splice(index1, )

                    } else {
                        const index2 = data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['likes'].indexOf(Cuser)
                        data[1][Fuser]["publications"][IDpost]['commits'][IDcommit]['likes'].splice(index2, )

                        data[1][Fuser]["publications"][IDpost]['commits'][IDcommit][Type].push(Cuser)

                    }
                }


            } else {
                data[1][Fuser]["publications"][IDpost]['commits'][IDcommit][Type].push(Cuser)
            }

        }
        fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf-8');
        res.send(data[1][Fuser]["publications"][IDpost]['commits'][IDcommit])
    }

);

router.post('/bio', (req, res) => {
    const data = readFile();
    const { Cuser, bio } = req.body;
    data[1][Cuser]["bio"] = bio
    res.send("bio do usuario alterada")
    fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf-8');
});

router.post('/commit', (req, res) => {
    const data = readFile();
    const { commit, idkey, Cuser } = req.body;
    const keys = decodeKey(idkey)

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const idCommit = `${Cuser}-${ano}.${mes}.${hora}.${minuto}`

    data[1][keys.a]["publications"][idkey]['commits'][idCommit] = { commit: commit, likes: [], Dlikes: [], nome: data[1][Cuser]["nome"] }

    fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf-8');
});

router.delete('/commit/:id1/:id2', (req, res) => {
    // Ler os dados
    const data = readFile();

    const id1 = req.params.id1;
    const id2 = req.params.id2;

    const KeysUserPost = decodeKey(id1);
    const publication = data[1][KeysUserPost.a]["publications"][id1];

    delete data[1][KeysUserPost.a]['publications'][id1]['commits'][id2]
    fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf-8');
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

function decodeKey(key) {
    const partes = key.split('-');
    if (partes.length === 2) {
        const n1 = partes[0];
        const n2 = partes[1];

        return {
            a: n1,
            b: n2,
        };
    }
    return null;
}



server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!!`);
});