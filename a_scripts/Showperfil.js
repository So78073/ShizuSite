const friendID = sessionStorage.getItem('friendClick');

console.log(friendID);

function Ready() {
    const TextName = document.getElementById('nomeUser');
    TextName.textContent = friendID;
}