// adding event listener to login button
(function () {
    var login = document.getElementById('login');

    login.addEventListener('click', sendForm);
})();

// send login credentials to database
function sendForm(event) {
    
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    const user = {
        username: username,
        password: password
    };

    const url = '../php/login.php';
    sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(user)}` }, load, console.log);
}

// redirect user to index page
function load(response) {
    if (response.success) {
        window.location = 'index.html'; // change this later
    } else {
        var error = document.querySelector('.error');
        error.innerHTML = response.data;
    }
}