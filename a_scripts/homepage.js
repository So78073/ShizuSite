var currentUser = sessionStorage.getItem('user');




for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i); // Obtém a chave (nome) do item
    const value = sessionStorage.getItem(key); // Obtém o valor do item
    console.log(`Chave: ${key}, Valor: ${value}`);
}



function readyPage() {
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
            username.textContent = data[1][currentUser]['nome'];
        })
        .catch((error) => {
            // Trata erros de rede ou de outra natureza
            console.error('Ocorreu um erro:', error);
        });
}

readyPage();