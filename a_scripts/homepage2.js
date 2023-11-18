function infoPerfil(bt) {

    const popup = document.getElementById("config");
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

function GetAutAccount() {
    window.location.href = "../a_project/log.html";
}

function openOPC() {

    const elem = document.getElementById('opcPerfil');

    if (getComputedStyle(elem).display === "block") {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }


}