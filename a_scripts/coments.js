const cuser = sessionStorage.getItem('user');



function commitkk() {

    const bt = document.getElementById(`CT`);
    const code = bt.getAttribute("data-key");

    const TextArea = document.getElementById(code);
    const key = decodeKey(code)

    const struc = {
        commit: TextArea.value,
        idkey: key.b,
        Cuser: cuser
    }
    fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struc)
        })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


function Commit(bt) {
    const idPost = bt.getAttribute('data-key');
    const commit = document.getElementById(`ta-${idPost}`).value;




    const struc = {
        commit: commit,
        idkey: idPost,
        Cuser: cuser
    }


    fetch('http://localhost:3000/commit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struc)
        })
        .then(response => response.json())
        .then(data => {})
        .catch(error => {
            console.error('Erro:', error);
        });
}


function LikeCommit(bt, Type) {
    const data = bt.getAttribute('data-key')
    const key = separateTwoKeys(data)

    const obj = {
        Cuser: Cuser,
        Fuser: decodeKey(key.a).a,
        IDpost: key.a,
        IDcommit: key.b,
        Type: Type,
        Func: "COMMIT",
    }
    fetch('http://localhost:3000/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {})
        .catch(error => {
            console.error('Erro:', error);
        });
}



function InfoCommit(bt) {
    const IDpost = bt.getAttribute('data-key');
    const popup = document.getElementById(IDpost);
    const computedStyle = window.getComputedStyle(popup);

    if (computedStyle.display === 'flex') {
        popup.style.animation = "fechar 1s ease-in-out";

        // Adicione um ouvinte de evento para detectar quando a animação "fechar" termina
        popup.addEventListener("animationend", () => {
            popup.style.display = 'none';
            popup.style.animation = '';
        }, { once: true });
    } else {
        popup.style.display = 'flex';
        popup.style.animation = "abrir 1s ease-in-out";

        // Adicione um ouvinte de evento para detectar quando a animação "abrir" termina
        popup.addEventListener("animationend", () => {
            popup.style.animation = '';
        }, { once: true });
    }
}


function popupFunction(bt) {
    const key = bt.getAttribute('data-key');
    const elem = document.getElementById(key);

    if (window.getComputedStyle(elem).display === 'none') {
        elem.style.display = 'flex';
    } else {
        elem.style.display = 'none';
    }
    console.log('aperto');
}

function DeleteCommitFunction(bt) {
    // Obtém os IDs dos recursos a serem excluídos do atributo 'data-key' do botão
    const ids = bt.getAttribute('data-key');
    const keys = separateTwoKeys(ids);

    // Exibe as chaves separadas no console para fins de depuração
    console.table(keys);
    const obj = {
        id1: keys.a,
        id2: keys.b,
        Type: "commit"
    }


    // Envia uma solicitação DELETE para a API para excluir os recursos
    fetch('http://localhost:3000/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {})
        .catch(error => {
            console.error('Erro:', error);
        });
}

function openCommitArea(bt) {
    const id = bt.getAttribute('data-key');
    const elem = document.getElementById(id);

    if (window.getComputedStyle(elem).display == 'none') {
        elem.style.display = 'flex'
    } else {
        elem.style.display = 'none'
    }

}


/* ============================================================================ */
function decodeKey(key) {
    const partes = key.split('-');
    if (partes.length === 2) {
        const n1 = partes[0];
        const n2 = partes[1];
        return {
            a: n1,
            b: n2,
        };
    }
    // Retorna um valor padrão se a extração falhar
    return null;
}

function separateTwoKeys(keys) {
    const partes = keys.split('/');
    if (partes.length === 2) {
        const n1 = partes[0];
        const n2 = partes[1];
        return {
            a: n1,
            b: n2,
        };
    }
    // Retorna um valor padrão se a extração falhar
    return null;
}