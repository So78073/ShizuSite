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
    const text = document.getElementById('textpost').value;
    const fileInput = document.getElementById('arquivo');
    const imgPostDiv = document.getElementById('imgpost');

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();

    const obj = {
        userid: currentUser,
        txtid: `${currentUser}-${ano}.${mes}.${hora}.${minuto}`,
        text: text,
    };

    const formData = new FormData();
    formData.append('userid', obj.userid);
    formData.append('txtid', obj.txtid);
    formData.append('text', obj.text);
    formData.append('img', fileInput.files[0]);

    console.log(obj);

    // Agora você pode fazer a solicitação para a API usando fetch
    fetch('http://localhost:3000/', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Aqui você pode lidar com a resposta da API
            console.log('Resposta da API:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar a postagem:', error);
        });

    imgPostDiv.innerHTML = '';
}




function openPopUpPost(bt) {
    const elem = document.getElementById(bt.getAttribute('data-key'));

    if (getComputedStyle(elem).display == 'block') {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }

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