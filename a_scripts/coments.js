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
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

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

function Commit(bt) {
    const Cuser = sessionStorage.getItem('user');
    const idPost = bt.getAttribute('data-key');
    const commit = document.getElementById(`ta-${idPost}`).value;




    const struc = {
        commit: commit,
        idkey: idPost,
        Cuser: Cuser
    }

    console.table(struc);

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

function test() {
    console.log('apertou');
}

function LikeCommit(bt, Type) {
    const IDcommit = bt.getAttribute("data-keyMit");
    const IDpost = bt.getAttribute("data-key");
    const key = decodeKey(IDpost);
    const obj = {
        Cuser: Cuser,
        Fuser: key.a,
        IDpost: IDpost,
        IDcommit: IDcommit,
        Type: Type,
        Func: "COMMIT"
    }



    fetch('http://localhost:3000/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function decodeKey(key) {
    const partes = key.split('-');
    if (partes.length === 2) {
        const numeroAntesDoHifen = partes[0];
        const numeroDepoisDoHifen = partes[1];
        return {
            k: numeroAntesDoHifen,
            d: numeroDepoisDoHifen
        };
    }
    // Retorna um valor padrão se a extração falhar
    return null;
}