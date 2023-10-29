const currentUser = sessionStorage.getItem('user');

function RenderPage() {


    fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            let Follows = data[1][currentUser]['seguindo'];
            const followConfig = document.getElementById('FollowBtton');
            Follows.push(currentUser);


            let round = 0
            for (let f in Follows) {
                f = Follows[f];
                const friend = data[1][f];
                const publications = Object.keys(friend['publications']);
                const publi = friend["publications"];
                const Cpubli = publi[publications[round]];

                const like = Object.keys(Cpubli['likes']).length;
                const Dike = Object.keys(Cpubli['Dlikes']).length;
                const Comp = Object.keys(Cpubli['Compar']).length;

                const idpost = publications[round];
                CreatPostFriendPage(friend['nome'], Cpubli['txt'], like, Dike, Comp, idpost, f);
                if (Object.keys(Cpubli['commits']).length > 0) {
                    const AllCommits = Cpubli['commits']
                    for (let i in AllCommits) {
                        const userBASE = decodeKey(i)
                        const commit = AllCommits[i]
                        commitRender(commit['nome'], idpost, commit['likes'].length, commit['Dlikes'].length, commit['commit'], i)

                    }

                }
            }


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
                        </div>
                    </div>
                    <div class="committext">
                        <p class="TextCommit">${txt}</p>
                        <div class="reactions">
                                <button class="bt_react" data-key="${idpost}/${idCommit}" onclick="LikeCommit(this, 'likes')"> 
                                <img src="/IMG/reacts/like.png" class="img_icon"></button>
                                <label>${likes}</label>
                            </div>

                                <button class="bt_react" data-key="${idpost}" onclick="LikeCommit(this, 'Dlikes')">
                                <img src="/IMG/reacts/Delike.png" class="img_icon"></button>
                                <label>${Dlikes}</label>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    pai.insertAdjacentHTML('beforeend', htmlString);
}


function CreatPostFriendPage(nome, texto, Nlike, Ndeslike, Ncomp, idpost, idF) {

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
                <button class="bt_react" onclick="reactpostAPI('${currentUser}', '${idF}', 'likes', '${idpost}')" id="like-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/like.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('likes', this)" data-pai="${idpost}">${Nlike}</label>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${currentUser}', '${idF}', 'Dlikes', '${idpost}')" id="Dlike-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/delike.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ndeslike}</label>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${currentUser}', '${idF}', 'Compar', '${idpost}')" id="Comp-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/comp.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ncomp}</label>
            </div>
        </div>

        <div class="Plike" id="pl.${idpost}"></div>

        <div class="ChatZone">
            
            <button class="ChatZoneOnOff" onclick="test()">Comentários 0</button>
            
            
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





for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i); // Obtém a chave (nome) do item
    const value = sessionStorage.getItem(key); // Obtém o valor do item
}

RenderPage()



function readyPage() {
    const currentUser = sessionStorage.getItem('user');

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
            const user = data[1][currentUser]
            username.textContent = user['nome'];
            document.title = `${user['nome']}` + ' ShSite';
        })
        .catch((error) => {
            // Trata erros de rede ou de outra natureza
            console.error('Ocorreu um erro:', error);
        });
}



readyPage();