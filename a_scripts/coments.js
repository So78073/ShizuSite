function commitkk() {
    const Cuser = sessionStorage.getItem('user')
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