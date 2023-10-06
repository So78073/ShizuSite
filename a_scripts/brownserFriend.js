function BrownserFR() {



    const txt = document.getElementById('nomeFriendBrownser');
    const nome = txt.value;

    console.log(nome);

    fetch(`http://localhost:3000/friends?nome=${nome}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            for (let p in data) {

                RenderFrindesBrowser(p);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


function RenderFrindesBrowser(nome) {

    const encontrados = document.getElementById('encontrados');


    const htmlString = `
    <div class="friend_div">
        <img src="/IMG/USER_DEFAUT.png" class="imgFrinds">
        <button class="friendsBT">${nome}</button>
    </div>
    `;

    encontrados.insertAdjacentHTML('beforeend', htmlString);
}