var post = {
    nome: '',
    titulo: '',
    mensag: '',
    like: '',
    delike: '',

    comentarios: [{
        nome: '',
        comentario: ''
    }]
}
var popupOnOff = 0;

function openPOPup() {

    const suaPopup = document.getElementById('popupADDpost');


    const popup = document.getElementById('popupADDpost');
    if (popupOnOff == 0) {
        suaPopup.classList.add('active');
        popup.style.display = 'flex'
        popupOnOff = 1
    } else {
        popup.style.display = 'none'
        popupOnOff = 0
    }

}