const currentUser = sessionStorage.getItem('user');

function RenderPage() {

    console.log(currentUser);
    fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('test');
            const Follows = data[1][currentUser]['seguindo'];

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

                CreatPostFriendPage(friend['nome'], Cpubli['txt'], like, Dike, Comp, publications[round])



            }


        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

function CreatPostFriendPage(nome, texto, Nlike, Ndeslike, Ncomp, idpost) {

    const newPosts = document.getElementById('newPosts');

    const htmlString = `
    <div class="posts" id="${idpost}">
    <div class="readyPost">
        <div class="userInfoPost">
            <img src="/IMG/USER_DEFAUT.png">
            <h2 class="h2">${nome}</h2>
        </div>
        <p class="Ppost">${texto}</p>
        <div class="ReactPost">
            <div class="iconPost">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
            </div>
            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('like', this)" data-pai="${idpost}"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label style="cursor: pointer;" onclick="ReactPress('likes', this)" data-pai="${idpost}">${Nlike}</label>
            </div>
            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('Dlike', this)" data-pai="${idpost}"><img src="/IMG/reacts/delike.png" class="img_icon"></button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ndeslike}</label>
            </div>
            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('Comp', this)" data-pai="${idpost}"><img src="/IMG/reacts/compartilhar.png" class="img_icon"></button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ncomp}</label>
            </div>

        </div>
    </div>
    
    <div class="Plike" id="pl.${idpost}">

    </div>

    </div>
    `;

    newPosts.insertAdjacentHTML('beforeend', htmlString);

}

/*react post */
function reactpostAPI(user, userpost) {

    const id = `${user}-${userpost}`;
    fetch(`http://localhost:3000/friends/crud?nome=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
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