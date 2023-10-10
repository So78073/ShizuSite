function RenderPage() {
    const currentUser = sessionStorage.getItem('user');
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

                console.log();
                CreatPostFriendPage(friend['nome'], Cpubli['txt'], like, Dike, Comp)



            }


        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

function CreatPostFriendPage(nome, texto, Nlike, Ndeslike, Ncomp) {

    const newPosts = document.getElementById('newPosts');

    const htmlString = `
    <div class="posts">
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
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label for="">${Nlike}</label>
            </div>
            <div class="reactions">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label for="">${Ndeslike}</label>
            </div>
            <div class="reactions">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label for="">${Ncomp}</label>
            </div>
        </div>
    </div>

    <div class="Plike">
        
    </div>

</div>
    `;

    newPosts.insertAdjacentHTML('beforeend', htmlString);

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