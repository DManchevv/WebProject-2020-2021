(function() {
    var save = document.querySelector("#save");

    save.addEventListener("click", saveTable);
})();

function saveTable() {

    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);

    var table = document.querySelectorAll(".table-cell");
    
    const url = "../php/saveTable.php";

    table.forEach(element => {
        var indexOfDiv = element.innerHTML.indexOf("<div class=");
        var innerValue;
        if (indexOfDiv !== -1) {
            innerValue = element.innerHTML.substring(0, indexOfDiv);
        } else {
            innerValue = element.innerHTML;
        }
        const tableCell = {
            id: element.id,
            class: element.classList.value,
            innervalue: innerValue
        }
        sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(tableCell)}` }, load, console.log);
    });
}

function load(response) {
    if (response.success) {
    } else {
        console.log(response);
    }
}