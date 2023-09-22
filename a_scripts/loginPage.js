var page = 0

loginToRegs();

function loginToRegs() {
    if (page == 0) {
        page = 1;
    } else { page = 0 }

    if (page == 0) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
        document.getElementById('page').innerText = 'Login';
    }

    if (page == 1) {
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'none';
        document.getElementById('page').innerText = 'Register';
    }

}