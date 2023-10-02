const apiUrl = 'http://localhost:3000/';

function elem(elem, metodo) {
    const formLOG = document.getElementById('formLogin');
    const formREG = document.getElementById('formRegis');

    if (metodo == 'get') {
        return formLOG.elements[elem].value;
    }
    if (metodo == 'post') {
        return formREG.elements[elem].value;
    }
}


function GETdata() {
    let user = {
        user: elem('user', 'get'),
        senha: elem('senha', 'get'),
        email: elem('email', 'get'),
    }


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

            // --------------------------------------------------------------------------------------------------------------
            if (user['user'] in data[0]) {
                if (user['senha'] == data[0][user['user']]['senha'] && user['email'] == data[0][user['user']]['email']) {
                    sessionStorage.setItem('user', `${data[0][user['user']]['id']}`);
                    window.location.href = "../a_project/princPage.html"

                } else { alert(' senha ou email invalidos :(') }
            } else { alert('usuario não encontrado') }

            // --------------------------------------------------------------------------------------------------------------
        })
        .catch((error) => {
            // Trata erros de rede ou de outra natureza
            console.error('Ocorreu um erro:', error);
        });
}

function POSTdata() {
    let user = {
        user: elem('user', 'post'),
        senha: elem('senha', 'post'),
        email: elem('email', 'post'),
        nome: elem('nome', 'post'),
    }

    fetch(apiUrl, {
            method: 'POST', // Corrigido para 'method' aqui
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            // Manipular dados de resposta, se necessário
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}