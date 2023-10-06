const friendID = sessionStorage.getItem('friendClick');
const currentUser = sessionStorage.getItem('user');

console.log(friendID);

function Ready() {


    fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const TextName = document.getElementById('nomeUser');
            const BioUser = document.getElementById('BioUserID');
            const Friend = data[1][friendID];


            TextName.textContent = Friend['nome'];
            BioUser.textContent = Friend['biografia'];

        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

Ready();

function seguir() {

    const info = {
        currentUser: currentUser,
        friendID: friendID
    }

    fetch('http://localhost:3000/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

function back() {
    window.location.href = "../a_project/princPage.html";
}