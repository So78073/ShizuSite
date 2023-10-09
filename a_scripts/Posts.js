const currentUser = sessionStorage.getItem('user');
RenderPage()


var popupOnOff = 0;

function openPOPup() {
    const elem = document.getElementById('popupADDpost')
    if (popupOnOff == 0) {
        elem.style.display = 'flex';
        popupOnOff = 1;
    } else {
        elem.style.display = 'none';
        popupOnOff = 0
    }
}

async function fetchUserData() {
    const apiUrl = 'http://localhost:3000/';
    try {
        const response = await fetch(apiUrl, optionsGET);
        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* APLICAÇÃO EM SI (ADICIONAR NOVO POST AO PERFIL) */
function newPostInPerfil() {
    const text = document.getElementById('textpost');

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();

    const struc = {
        userid: currentUser,
        txtid: `${currentUser}.${ano}.${mes}.${hora}.${minuto}`,
        text: text.value,
        like: 0,
        deslike: 0,
        compartilhamentos: 0
    }

    console.log(struc['idpost'], struc['text']);

    fetch('http://localhost:3000/publiAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struc)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}



function RenderPage() {
    fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('1');
            let friends = data[1][currentUser]['seguindo'];

            for (let F in friends) {
                let f = data[1][friends];

                const p = Object.keys(f['publications'])


                for (let i in p) {
                    let publi = f['publications'][p[i]]
                    const likes = Object.keys(publi['likes']).length
                    const Dlikes = Object.keys(publi['Dlikes']).length
                    const Compar = Object.keys(publi['Compar']).length

                    CreatPostFriendPage(f['nome'], publi['txt'], likes, Dlikes, Compar)

                }
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





/*
<div class="Guy" id="divGuy1">
<div class="PeoplesReact">
    <img src="/IMG/USER_DEFAUT.png" class="imgFrinds">
    <button class="friendsBT" onclick="ClickFriend()">${nome}</button>
</div>
<div class="PeoplesReact">
    <img src="/IMG/USER_DEFAUT.png" class="imgFrinds">
    <button class="friendsBT" onclick="ClickFriend()">${nome}</button>
</div>
<div class="PeoplesReact">
    <img src="/IMG/USER_DEFAUT.png" class="imgFrinds">
    <button class="friendsBT" onclick="ClickFriend()">${nome}</button>
</div>
</div>

*/