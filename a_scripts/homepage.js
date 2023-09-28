const apiUrl = 'http://localhost:3000/';
var currentUser = sessionStorage.getItem('user');



const optionsGET = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

// Função assíncrona que busca os dados do usuário
async function fetchUserData() {
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

// Chama a função assíncrona e aguarda a conclusão
function userReady(inf) {
    (async() => {
        const userData = await fetchUserData();
        const name_ = document.getElementById('nameUser');
        name_.textContent = userData[1][currentUser]['nome']
        console.log('script rodou');
    })();
}

userReady();