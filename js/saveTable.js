(function() {
    var save = document.querySelector("#save");

    save.addEventListener("click", saveTable);
})();

function saveTable() {

    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);

    var table = document.querySelectorAll(".table-cell");
    
    const url = "../php/saveTable.php";

    var tableCells = [];

    table.forEach(element => {
        var indexOfDiv = element.innerHTML.indexOf("<div class=");
        var innerValue;
        if (indexOfDiv !== -1) {
            innerValue = element.innerHTML.substring(0, indexOfDiv);
        } else {
            innerValue = element.innerHTML;
        }
        var cellOwner = " ";
        if (element.hasAttribute("owner")) {
            cellOwner = element.getAttribute("owner");
        }
        const tableCell = {
            id: element.id,
            class: element.classList.value,
            innervalue: innerValue,
            owner: cellOwner,
            style: element.style.cssText
        }
        tableCells.push(tableCell);
        //sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(tableCell)}` }, load, console.log);
    });
    sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(tableCells)}` }, load, console.log);
}

function load(response) {
    if (response.success) {
    } else {
        console.log(response);
    }
}