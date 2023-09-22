const apiUrl = 'http://localhost:3000/';

// Opções da solicitação (no caso de uma solicitação GET, não é estritamente necessário)
const options = {
    method: 'GET', // Método da solicitação (GET é o padrão)
    headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo da solicitação (JSON no nosso caso)
        // Outros cabeçalhos personalizados, se necessário
    },
};

// Fazendo a solicitação Fetch
fetch(apiUrl, options)
    .then((response) => {
        // Verifica se a resposta da solicitação foi bem-sucedida (código de status 200 a 299)
        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
        }

        // Se a resposta estiver OK, convertemos a resposta em JSON
        return response.json();
    })
    .then((data) => {
        // Manipula os dados JSON da resposta
        console.log('Dados recebidos:', data);
    })
    .catch((error) => {
        // Trata erros de rede ou de outra natureza
        console.error('Ocorreu um erro:', error);
    });


function enviarDados() {
    const dados = {
        nome: document.getElementById('nome').value,
        senha: sdocument.getElementById('senha').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Lógica para lidar com a resposta da API
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}