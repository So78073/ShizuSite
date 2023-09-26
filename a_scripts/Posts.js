var post = {
    titulo: '',
    mensag: '',
    like: '',
    delike: '',

    comentarios: [{
        nome: '',
        comentario: ''
    }]
}

function openPOPup() {
    document.getElementById("popupContainer").style.display = "block";
}

function closePOPup() {
    document.getElementById("popupContainer").style.display = "none";
}