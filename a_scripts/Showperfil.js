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

            const FollowButton = document.getElementById('FollowBtton')
            const Friend = data[1][friendID];


            TextName.textContent = Friend['nome'];


            if (data[1][friendID]['seguidores'].includes(currentUser)) {
                FollowButton.style.background = 'rgb(255, 30, 0)';
                FollowButton.style.boxShadow = 'rgb(255, 30, 0)';
            } else {

                FollowButton.style.boxShadow = 'rgb(0, 102, 255)';
                FollowButton.style.boxShadow = 'rgb(0, 102, 255)';
            }

            if (currentUser == friendID) {
                chageElement(1, Friend['biografia'])
                FollowButton.style.display = 'none';
            } else {
                chageElement(0, Friend['biografia'])
            }

            const BioUser = document.getElementById('BioUserID');
            BioUser.textContent = Friend['biografia'];

            for (let i in data[1][friendID]["publications"]) {
                let obj = data[1][friendID]["publications"][i]

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

function chageElement(type, bio) {
    if (type == 0) {
        const mid = document.getElementById('mid');

        const htmlString = `
        <p>
        ${bio}
        </p >

        <div class="emblemas" style="height: 190px;">
            <label for="">Em Breve: sistema de emblemas !</label>
        </div>
        `;
        mid.insertAdjacentHTML('beforeend', htmlString);
    }
    if (type == 1) {
        const mid = document.getElementById('mid');

        const htmlString = `
        <textarea name="" id="BioUserID" cols="30" rows="10" class="TxtAreaUser">
        ${bio}
        </textarea>
        <button class="btTXT"></button>

        <div class="emblemas" style="height: 190px;">
            <label for="">Em Breve: sistema de emblemas !</label>
        </div>
        `;
        mid.insertAdjacentHTML('beforeend', htmlString);
    }

}