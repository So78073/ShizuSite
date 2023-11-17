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
        text: text.value
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



function dellpost(bt) {

    const idPost = bt.getAttribute('data-key');

    const obj = {
        Cuser: Cuser,
        id1: idPost,
        id2: null,
        Type: 'post'
    }

    fetch('http://localhost:3000/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {})
        .catch(error => {
            console.error('Erro:', error);
        });


}