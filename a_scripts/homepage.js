var currentUser = sessionStorage.getItem('user');

console.log(currentUser);

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