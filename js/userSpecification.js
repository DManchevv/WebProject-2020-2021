const anonymous = ["rhino", "tiger", "leopard", "elephant"];
var username;

function isUserLoggedIn() {
    const url = "../php/currentUser.php";
    sendRequest(url, { method: 'GET' }, load, console.log);
}
function load(response) {
    if (response.success) {
        if (response["username"] && response["type"]) {
            username = response["username"];
            loadLoggedUser();
            return true;
            
        } else {
            return false;
        }
    } else {
        /*var error = document.querySelector('.error');
        error.innerHTML = response.data;*/
    }
}

function loadGuestUser(id) {
    var tableInfo = document.querySelector("#table-info");

    const randomImg = Math.floor(Math.random() * anonymous.length);

    var section = document.createElement("section");
    section.classList.add("user-content");
    section.setAttribute('id', id);

    var text = document.createElement("figcaption");
    text.innerHTML = `anonymous: ${anonymous[randomImg]}`;
    section.appendChild(text);


    var userImg = document.createElement("img");
    userImg.classList.add("user-img");
    userImg.setAttribute("src", `../images/${anonymous[randomImg]}.png`);
    imageFunctionality(userImg, text);

    section.appendChild(userImg);
    
    tableInfo.appendChild(section);
}

function loadLoggedUser() {
    var registerBtn = document.querySelector("#register-btn");
    var loginBtn = document.querySelector("#login-btn");

    registerBtn.parentNode.removeChild(registerBtn);
    loginBtn.parentNode.removeChild(loginBtn);

    var logout = document.createElement("button");
    logout.id = "logout-btn";
    logout.addEventListener("click", logoutUser);
    logout.innerHTML = "logout";

    var tableInfo = document.querySelector("#table-info");
    tableInfo.appendChild(logout);

    var tableCells = document.querySelectorAll(".table-cell");
    //console.log(tableCells);
    tableCells.forEach(td => {
        td.addEventListener('input', () => {
            if (conn != null) {
                conn.send(`loggedUserChangeCell_${username}-` + td.id + "-" + td.innerText);
                td.setAttribute("owner", `${username}`);
            }
            if (td.innerText === "" && td.getAttribute) {
                td.removeAttribute("owner");
            }
        });
    });
}

function logoutUser() {
    const url = "../php/logout.php";

    sendRequest(url, { method: 'POST' }, goToLogin, console.log);
}

function goToLogin(response) {
    if (response.success) {
        window.location = "login.html";
    }
}

function imageFunctionality(userImg, text) {
    
    userImg.addEventListener("mouseenter", function(event) {
        text.style.width = "110px";
        text.style.padding = "auto";
        text.style.visibility = "visible";
        text.style.opacity = 1;
    });

    userImg.addEventListener("mouseleave", function(event) {
        text.style.visibility = "hidden";
    });
}

function sendRequest(url, options, successCallback, errorCallback) { 
    var request = new XMLHttpRequest();

    request.onload = function() { 
        var response = JSON.parse(request.responseText);

        if (request.status === 200) {
            successCallback(response);
        } else {
            errorCallback(response);
        }
    };

    request.open(options.method, url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(options.data);
}