function BrownserFR() {

    const nome = document.getElementById('nomeFriendBrownser').value;

    fetch(`http://localhost:3000/friends?nome=${nome}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}