const Cuser = sessionStorage.getItem('user')

function commitkk() {

    const bt = document.getElementById(`CT`);
    const code = bt.getAttribute("data-key");

    const TextArea = document.getElementById(code);
    const key = decodeKey(code)

    const struc = {
        commit: TextArea.value,
        idkey: key.b,
        Cuser: Cuser
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
    const Cuser = sessionStorage.getItem('user');
    const idPost = bt.getAttribute('data-key');
    const commit = document.getElementById(`ta-${idPost}`).value;




    const struc = {
        commit: commit,
        idkey: idPost,
        Cuser: Cuser
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








function test(bt) {
    const IDpost = bt.getAttribute('data-key');
    const popup = document.getElementById(IDpost);

    if (popup.style.display === 'flex') {
        popup.style.animation = "fechar 1s ease-in-out";

        // Adicione um ouvinte de evento para detectar quando a animação "abrir" termina
        popup.addEventListener("animationend", () => {
            popup.style.display = 'none';
        }, { once: true });
    } else {
        popup.style.display = 'flex';
        popup.style.animation = "abrir 1s ease-in-out";

        // Adicione um ouvinte de evento para detectar quando a animação "fechar" termina
        popup.addEventListener("animationend", () => {
            popup.style.animation = "";
        }, { once: true });
    }
}

function popupFunction(bt, Type) {
    const elem = document.getElementById(bt.getAttribute('data-key'))

    if (elem.style.display == 'none') {
        elem.style.display = 'flex';
    } else {
        elem.style.display = 'none';
    }

}

function DeleteCommitFunction(bt) {
    const ids = bt.getAttribute('data-key');
    const keys = separateTwoKeys(ids)
    console.table(keys);

    const id1 = keys.a
    const id2 = keys.b

    fetch(`/api/recursos/${id1}/${id2}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 204) {
                console.log('Recursos excluídos com sucesso');
            } else {
                console.error('Falha ao excluir os recursos');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir os recursos:', error);
        });
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