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

            const publications = data[1][Fuser]['publications'];
            const keys = Object.keys(publications);
            for (let i in keys) {
                const key = keys[i];
                const post = data[1][Fuser]['publications'][key];


                const nome = data[1][Fuser]['nome']
                const texto = post['txt']
                const Nlikes = Object.keys(post['likes']).length
                const Ndeslikes = Object.keys(post['likes']).length
                const Ncomp = Object.keys(post['likes']).length
                const Ncoments = Object.keys(post['commits']).length



                CreatPostFriendPage(nome, texto, Nlikes, Ndeslikes, Ncomp, key, Fuser, Ncoments)
            }

            const BioUser = document.getElementById('BioUserID');


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

    console.log(info);

}

function back() {
    window.location.href = "../a_project/princPage.html";
}

/* asdjlasjdlajdkljaskldjaskldjklasjdlasjdkajskldjaklsjdklajsdklasjdklasjdklajkldajskldjaslkdjaskldjakljdklsadjklajsdkljdklajdkljaklsdjakldjakljdakldjlaskdjlaskdjkladj */

function commitRender(nome, idpost, likes, Dlikes, txt, idCommit) {
    const pai = document.getElementById(`cm-${idpost}`);

    const htmlString = `
    <div class="card">
                    <div class="commituser">
                        <div class="UserInfoChat">
                            <img src="/IMG/USER_DEFAUT.png" style="margin-left: 15px; margin-top: 3px;">
                            <label class="CommitUserName">${nome}</label>
                            <div class="div_config_commit">
                                <button class="bt_opc_commit" data-key="popPost/${idpost}" onclick="InfoCommit(this)"> 
                                <img src="/IMG/config_postMit.png" class="img_icon"></button>
                            </div>
                            <div class="div_option_commit" id="popPost/${idpost}">
                                <button class="buttonInfoCommit" data-key="co/${idCommit}" onclick="popupFunction(this)">Excluir</button>
                                <button class="buttonInfoCommit"></button>
                                <button class="buttonInfoCommit"></button>
                                <button class="buttonInfoCommit"></button>
                            </div>
                            <div class="confirm" id="co/${idCommit}">
                                <div class="conteudo">
                                    <!-- Conteúdo da sua popup aqui -->
                                    <p>Este é o conteúdo da popup.</p>
                                    <button data-key="${idpost}/${idCommit}" onclick="DeleteCommitFunction(this)" >Excluir</button>
                                    <button data-key="co/${idCommit}" onclick="popupFunction(this)">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="committext">
                        <p class="TextCommit">${txt}</p>
                        <div class="reactions1">
                            <div class="reactions">
                                    <button class="bt_react" data-key="${idpost}/${idCommit}" onclick="LikeCommit(this, 'likes')"> 
                                    <img src="/IMG/reacts/like.png" class="img_icon"></button>
                                    <label>${likes}</label>
                                </div>
                                <div class="reactions">
                                    <button class="bt_react" data-key="${idpost}/${idCommit}" onclick="LikeCommit(this, 'Dlikes')">
                                    <img src="/IMG/reacts/Delike.png" class="img_icon"></button>
                                    <label>${Dlikes}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    pai.insertAdjacentHTML('beforeend', htmlString);
}


function CreatPostFriendPage(nome, texto, Nlike, Ndeslike, Ncomp, idpost, idF, Ncoments) {

    const newPosts = document.getElementById('page');



    const htmlString = `
    <div class="posts" id="${idpost}">
    <div class="readyPost">
        <div class="userInfoPost">
            <img src="/IMG/USER_DEFAUT.png">
            <h2 class="h2">${nome}</h2>
        </div>
        
        <div class="TextPosts">
            <p>${texto}</p>
        </div>


        <div class="ReactPost">
            <div class="ChatArea">
                <textarea id="ta-${idpost}" cols="30" rows="10" class="Commit2" placeholder="Comentar"></textarea>
                <button class="InviteCommit" onclick="Commit(this)" data-key="${idpost}">Enviar</button>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'likes', '${idpost}')" id="like-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/like.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('likes', this)" data-pai="${idpost}">${Nlike}</label>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'Dlikes', '${idpost}')" id="Dlike-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/delike.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ndeslike}</label>
            </div>

            <div class="reactions">
                <button class="bt_react" onclick="reactpostAPI('${Cuser}', '${idF}', 'Compar', '${idpost}')" id="Comp-${idpost}" data-pai="${idpost}">
                    <img src="/IMG/reacts/comp.png" class="img_icon">
                </button>
                <label style="cursor: pointer;" onclick="ReactPress('like', this)" data-pai="${idpost}">${Ncomp}</label>
            </div>
        </div>

        <div class="Plike" id="pl.${idpost}"></div>

        <div class="ChatZone">
            
            <button class="ChatZoneOnOff" data-key="cm-${idpost}" onclick="openCommitArea(this)">Comentários ${Ncoments}</button>
            
            
            <div class="commits" id="cm-${idpost}">

            
            </div>


        <div class="likeChat"></div>

        <div class="reactions"></div>
    </div>
</div>

    `;


    newPosts.insertAdjacentHTML('beforeend', htmlString)

}

/* asdjlasjdlajdkljaskldjaskldjklasjdlasjdkajskldjaklsjdklajsdklasjdklasjdklajkldajskldjaslkdjaskldjakljdklsadjklajsdkljdklajdkljaklsdjakldjakljdakldjlaskdjlaskdjkladj */

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


function reactPost(IDcommit, Type, Func) {
    /*Cuser, Fuser, IDpost, IDcommit, Type, Func*/
    const obj = {
        Cuser: Cuser,
        Fuser: Fuser,
        IDpost: IDpost,
        Type: Type,
        Func: Func
    }
}