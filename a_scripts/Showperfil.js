const Fuser = sessionStorage.getItem('friendClick');
const Cuser = sessionStorage.getItem('user');

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
            const Friend = data[1][Fuser];


            TextName.textContent = Friend['nome'];


            if (data[1][Fuser]['seguidores'].includes(Cuser)) {
                FollowButton.style.background = 'rgb(255, 30, 0)';
                FollowButton.style.boxShadow = 'rgb(255, 30, 0)';
                FollowButton.textContent = 'Deixar';
            } else {

                FollowButton.style.boxShadow = 'rgb(0, 102, 255)';
                FollowButton.style.boxShadow = 'rgb(0, 102, 255)';
                FollowButton.textContent = 'Seguir';
            }

            if (Cuser == Fuser) {
                chageElement(1, Friend['bio'])
                FollowButton.style.display = 'none';
            } else {
                chageElement(0, Friend['bio'])
            }



            for (let i in data[1][Fuser]["publications"]) {
                const obj = data[1][Fuser]["publications"][i]

                const likes = Object.keys(obj['likes']).length
                const Dlikes = Object.keys(obj['Dlikes']).length
                const Compar = Object.keys(obj['Compar']).length
                const idPost = Object.keys(obj['Compar'])
                const chave = Object.keys(obj)

                post(Friend['nome'], obj['txt'], likes, Dlikes, Compar, chave, Fuser)

            }
            const BioUser = document.getElementById('BioUserID');
            console.log(Friend['bio']);

        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

Ready();

function seguir() {

    const info = {
        currentUser: Cuser,
        friendID: Fuser
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



function post(nome, texto, Nlike, Ndeslike, Ncomp, idpost, idF) {

    const page = document.getElementById('page');

    const htmlString = `
    <div class="posts" id="${idpost}">
    <div class="readyPost">
        <div class="userInfoPost">
            <img src="/IMG/USER_DEFAUT.png">
            <h2 class="h2">${nome}</h2>
        </div>
        <p class="Ppost">${texto}</p>
        <div class="ReactPost">
            <div class="iconPost">
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <button class="bt_react"><img src="/IMG/reacts/like.png" class="img_icon"></button>
            </div>
            <div class="reactions">
            <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'likes', '${idpost}')" id="like-${idpost}" data-pai="${idpost}"><img src="/IMG/reacts/like.png" class="img_icon"></button>
                <label style="cursor: pointer;" onclick="ReactPress('likes', this)" data-pai="${idpost}">${Nlike}</label>
            </div>
            <div class="reactions">
            <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'Dlikes', '${idpost}')" id="Dlike-${idpost}" data-pai="${idpost}"><img src="/IMG/reacts/delike.png" class="img_icon"></button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ndeslike}</label>
            </div>
            <div class="reactions">
            <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'Compar', '${idpost}')" id="Comp-${idpost}" data-pai="${idpost}"><img src="/IMG/reacts/comp.png" class="img_icon"></button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ncomp}</label>
            </div>

        </div>
    </div>
    
    <div class="Plike" id="pl.${idpost}">

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
        <textarea id="BioUserID" cols="30" rows="10" class="TxtAreaUser">${bio}</textarea>
        <button class="btTXT" onclick="saveBio()">salvar bio</button>

        <div class="emblemas" style="height: 190px;">
            <label for="">Em Breve: sistema de emblemas !</label>
        </div>
        `;
        mid.insertAdjacentHTML('beforeend', htmlString);
    }

}

function saveBio() {
    const bio = document.getElementById('BioUserID').value;
    const obj = {
        Cuser: Cuser,
        bio: bio
    }

    fetch('http://localhost:3000/bio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

/*
fetch('http://localhost:3000/bio', {
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
*/