function BrownserFR() {
    const txt = document.getElementById('nomeFriendBrownser');
    const nome = txt.value;

    const div = document.getElementById('encontrados')

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    fetch(`http://localhost:3000/friends?nome=${nome}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            for (let p in data) {
                RenderFrindesBrowser(p, data[p])
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


function RenderFrindesBrowser(nome, id) {

    const encontrados = document.getElementById('encontrados');


    const htmlString = `
    <div class="friend_div">
        <img src="/IMG/USER_DEFAUT.png" class="imgFrinds">
        <button class="friendsBT" onclick="ClickFriend(${id})">${nome}</button>
    </div>
    `;

    encontrados.insertAdjacentHTML('beforeend', htmlString);
}

function ClickFriend(id) {
    sessionStorage.setItem("friendClick", id);
    window.location.href = "../a_project/userPerfilarea.html";
}