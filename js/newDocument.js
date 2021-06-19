(function() {
    var newDocument = document.querySelector("#new-document");
    
    newDocument.addEventListener("click", loadNewDocument);
})();

function loadNewDocument() {
    cleanTable();
    //location.reload();
    if (conn != null) {
        conn.send("loadNewTable");
    }
}

function cleanTable() {
    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);
    var cells = document.querySelectorAll(".table-cell");
	cells.forEach(cell => {
        cell.innerText = "";
        cell.removeAttribute("style");
        if (cell.classList.contains("locked-cell")) {
            cell.classList.remove("locked-cell");
            cell.setAttribute("contenteditable", "");
        }
	});
}