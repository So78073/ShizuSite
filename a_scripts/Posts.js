var currentUser = sessionStorage.getItem('user');


function test(texto) {
    const newPosts = document.getElementById('newPosts');

    const htmlString = `
        <div class="posts">
            <div class="readyPost">
                <div class="userInfoPost">
                    <img src="/IMG/USER_DEFAUT.png">
                    <h2 class="h2">NOME DO USUARIO</h2>
                </div>
                <p class="Ppost">${texto}</p>
                <div class="ReactPost">
                    <div class="iconPost">
                        <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                        <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                        <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                    </div>
                    <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                    <button class="bt_react"><img src="/IMG/reacts/delike.png" class="img_icon"></button>
                    <button class="bt_react"><img src="/IMG/reacts/compartilhar.png" class="img_icon"></button>
                </div>
            </div>
        </div>
    `;

    newPosts.insertAdjacentHTML('beforeend', htmlString);
}

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
    const apiUrlpost = 'http://localhost:3000/newpublicationsAPI';
    const text = document.getElementById('textpost');

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();

    // Crie a string única combinando os valores



    const struc = {
        idpost: `${currentUser}.${ano}.${mes}.${hora}.${minuto}`
    }

    console.log(struc['idpost']);
    // Função assíncrona que busca os dados do usuário
    fetch(apiUrlpost, {
            mothod: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()

        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}



// Função assíncrona que busca os dados do usuário