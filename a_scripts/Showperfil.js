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

            if (data[1][friendID]['seguidores'].includes(currentUser)) {
                console.log("currentUser está seguindo friendID");
            } else {
                // Executar outra ação se a condição não for satisfeita
                console.log("currentUser não está seguindo friendID");
            }

            for (let i in data[1][friendID]["publications"]) {
                let obj = data[1][friendID]["publications"][i]

                console.log(obj);

                console.log(obj);
                post(obj['txt'], 0, 0, 0, Friend['nome'])

            }

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



function post(texto, like, delike, compartilhamentos, friendName) {
    const page = document.getElementById('page');

    const htmlString = `
    <div class="posts">
    <div class="readyPost">
        <div class="userInfoPost">
            <img src="/IMG/USER_DEFAUT.png">
            <h2 class="h2">${friendName}</h2>
        </div>
        <p class="Ppost">${texto}</p>
        <div class="ReactPost">
            <div class="iconPost">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
            </div>
            <div class="reactions">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label>${like}</label>
            </div>
            <div class="reactions">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label>${delike}</label>
            </div>
            <div class="reactions">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label>${compartilhamentos}</label>
            </div>
        </div>
    </div>
</div>
    `;

    page.insertAdjacentHTML('beforeend', htmlString);
}