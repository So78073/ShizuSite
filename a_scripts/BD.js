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
    let obj = {
        user: elem('user', 'post'),
        senha: elem('senha', 'post'),
        email: elem('email', 'post'),
        nome: elem('nome', 'post'),
    }

    for (let d in obj) {
        if (isStringOnlySpaces(obj[d]) == true) {
            obj[d] = null;
        }
    }

    if (obj['user'] != null && obj['senha'] != null && obj['email'] != null && obj['nome'] != null) {
        if (obj['user'] != null && obj['senha'] != null && obj['email'] != null && obj['nome'] != null) {
            fetch(apiUrl, {
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
            location.reload();
        } else {
            alert("não tem nada aqui")
        }

    } else {
        alert("Não há nada no campo requisitado ! complete todos por favor ^^ ! ")
    }




}

function isStringOnlySpaces(str) {
    var trimmedStr = str.trim();
    return trimmedStr === '';


    // Verifica se a string contém apenas espaços em branco
    // console.log(isStringOnlySpaces("   "));      true
    // console.log(isStringOnlySpaces("   Olá   "));  false
    // console.log(isStringOnlySpaces("Texto"));      false
    // console.log(isStringOnlySpaces(""));           true 


}