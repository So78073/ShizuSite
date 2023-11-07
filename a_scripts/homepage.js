const Cuser = sessionStorage.getItem('user');

function RenderPage() {


    fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            const dt = data[1]
            const seguindo = dt[Cuser]['seguindo']


            let publis = [];
            for (let i in seguindo) {
                let cache = 0;
                const friend = data[1][seguindo[i]]
                while (true) {
                    const a = Object.keys(dt[seguindo[i]]['publications'])[cache];
                    if (a && cache < 5) {
                        publis.push([dt[seguindo[i]]['publications'][a], a])
                        cache += 1;
                    } else {
                        break
                    }
                }
            }

            embaralharArray(publis)
            for (let p in publis) {

                const publi = publis[p][0]
                const idpost = publis[p][1]
                const Fuser = data[1][decodeKey(idpost).a]

                const obj = {
                    nome: Fuser['nome'],
                    txt: publi['txt'],
                    Nlike: publi['likes'].length,
                    Ndeslike: publi['Dlikes'].length,
                    Ncomp: publi['Compar'].length,
                    idpost: idpost,
                    idF: Fuser,
                    Ncoments: Object.keys(publi['commits']).length
                }
                console.table(obj);

            }


            /*"1-2023.11.11.20": { "txt": "", "likes": [], "Dlikes": [], "Compar": [], "commits": {} }*/
            /*CreatPostFriendPage(nome, texto, Nlike, Ndeslike, Ncomp, idpost, idF, Ncoments)*/


        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

function commitRender(nome, idpost, likes, Dlikes, txt, idCommit) {
    const pai = document.getElementById(`cm-${idpost}`);

    const htmlString = `
    <div class="card">
                    <div class="commituser">
                        <div class="UserInfoChat">
                            <img src="/IMG/USER_DEFAUT.png" style="margin-left: 15px; margin-top: 3px;">
                            <label class="CommitUserName">${nome}</label>
                            <div class="div_config_commit">
                                <button class="bt_opc_commit" data-key="popPost/${idpost}" onclick="InfoCommit(this)"> 
                                <img src="/IMG/config_postMit.png" class="img_icon"></button>
                            </div>
                            <div class="div_option_commit" id="popPost/${idpost}">
                                <button class="buttonInfoCommit" data-key="co/${idCommit}" onclick="popupFunction(this)">Excluir</button>
                                <button class="buttonInfoCommit"></button>
                                <button class="buttonInfoCommit"></button>
                                <button class="buttonInfoCommit"></button>
                            </div>
                            <div class="confirm" id="co/${idCommit}">
                                <div class="conteudo">
                                    <!-- Conteúdo da sua popup aqui -->
                                    <p>Este é o conteúdo da popup.</p>
                                    <button data-key="${idpost}/${idCommit}" onclick="DeleteCommitFunction(this)" >Excluir</button>
                                    <button data-key="co/${idCommit}" onclick="popupFunction(this)">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="committext">
                        <p class="TextCommit">${txt}</p>
                        <div class="reactions1">
                            <div class="reactions">
                                    <button class="bt_react" data-key="${idpost}/${idCommit}" onclick="LikeCommit(this, 'likes')"> 
                                    <img src="/IMG/reacts/like.png" class="img_icon"></button>
                                    <label>${likes}</label>
                                </div>
                                <div class="reactions">
                                    <button class="bt_react" data-key="${idpost}/${idCommit}" onclick="LikeCommit(this, 'Dlikes')">
                                    <img src="/IMG/reacts/Delike.png" class="img_icon"></button>
                                    <label>${Dlikes}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    pai.insertAdjacentHTML('beforeend', htmlString);
}


function CreatPostFriendPage(nome, texto, Nlike, Ndeslike, Ncomp, idpost, idF, Ncoments) {

    const newPosts = document.getElementById('newPosts');

    const htmlString = `
    <div class="posts" id="${idpost}">
    <div class="readyPost">
        <div class="userInfoPost">
            <img src="/IMG/USER_DEFAUT.png">
            <h2 class="h2">${nome}</h2>
        </div>
        
        <div class="TextPosts">
            <p>${texto}</p>
        </div>


        <div class="ReactPost">
            <div class="ChatArea">
                <textarea id="ta-${idpost}" cols="30" rows="10" class="Commit" placeholder="Comentar"></textarea>
                <button class="InviteCommit" onclick="Commit(this)" data-key="${idpost}">Enviar</button>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'likes', '${idpost}')" id="like-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/like.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('likes', this)" data-pai="${idpost}">${Nlike}</label>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'Dlikes', '${idpost}')" id="Dlike-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/delike.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ndeslike}</label>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'Compar', '${idpost}')" id="Comp-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/comp.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ncomp}</label>
            </div>
        </div>

        <div class="Plike" id="pl.${idpost}"></div>

        <div class="ChatZone">
            
            <button class="ChatZoneOnOff" data-key="cm-${idpost}" onclick="openCommitArea(this)">Comentários ${Ncoments}</button>
            
            
            <div class="commits" id="cm-${idpost}">

            
            </div>
        </div>
                
            </div>
            <canvas class="CanvasChat"></canvas>
        </div>

        <div class="likeChat"></div>

        <div class="reactions"></div>
    </div>
</div>

    `;
    newPosts.insertAdjacentHTML('beforeend', htmlString)

}

/*react post */
function reactpostAPI(Cuser, Fuser, Type, IDpost) {
    const obj = {
        Cuser: Cuser,
        Fuser: Fuser,
        IDpost: IDpost,
        IDcommit: null,
        Type: Type,
        Func: "POST"
    }



    fetch('http://localhost:3000/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function ReactPress(func, bt) {
    /*likes,  Dlikes, Compar*/

    if (func == 'likes')
        fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro de rede! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const code = bt.getAttribute("data-pai");
            const keys = decodeKey(code);
            const dt = data[1][keys.k]['publications'][code][func];

            for (let i in dt) {
                const fr = data[1][dt[i]]
                ReactPostPage(code, fr['nome'], keys.k)

            }


        })
        .catch((error) => {
            console.error('Ocorreu um erro:', error);
        });
}

/* comandos de definição =======================================================================================*/

function decodeKey(key) {
    const partes = key.split('-');
    if (partes.length === 2) {
        const numeroAntesDoHifen = partes[0];
        const numeroDepoisDoHifen = partes[1];
        return {
            k: numeroAntesDoHifen,
            d: numeroDepoisDoHifen
        };
    }
    // Retorna um valor padrão se a extração falhar
    return null;
}

function ReactPostPage(idpost, nome, idF) {

    const pai = document.getElementById(`pl.${ idpost }`);

    const htmlString = `
        <div class="PeoplesReact">
            <img src="/IMG/USER_DEFAUT.png" class="imgFrinds">
            <button class="friendsBT" onclick="ClickFriend(${idF})">${nome}</button>
        </div>
    `;

    pai.insertAdjacentHTML('beforeend', htmlString);

}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos i e j
    }
}





for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i); // Obtém a chave (nome) do item
    const value = sessionStorage.getItem(key); // Obtém o valor do item
}

RenderPage()



function readyPage() {
    const Cuser = sessionStorage.getItem('user');

    const username = document.getElementById('nameUser');

    fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro de rede! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const user = data[1][Cuser]
            username.textContent = user['nome'];
            document.title = `${user['nome']}` + ' ShSite';
        })
        .catch((error) => {
            // Trata erros de rede ou de outra natureza
            console.error('Ocorreu um erro:', error);
        });
}



readyPage();