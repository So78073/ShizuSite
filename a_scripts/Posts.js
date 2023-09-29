var currentUser = sessionStorage.getItem('user');
console.log(currentUser);



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
    const apiUrlpost = 'http://localhost:3000/newpublicationsAPI'
    const user = {}

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();

    // Crie a string única combinando os valores
    const idpost = `${currentUser}.${ano}.${mes}.${hora}.${minuto}`;
    console.log(idpost);


    // Função assíncrona que busca os dados do usuário
    fetch(apiUrlpost, {
            mothod: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

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