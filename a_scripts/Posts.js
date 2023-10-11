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
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
    const currentUser = sessionStorage.getItem('user');
    const text = document.getElementById('textpost');

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();

    const struc = {
        userid: currentUser,
        txtid: `${currentUser}-${ano}.${mes}.${hora}.${minuto}`,
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