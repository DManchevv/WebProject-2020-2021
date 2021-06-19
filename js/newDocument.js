(function() {
    var newDocument = document.querySelector("#new-document");
    
    newDocument.addEventListener("click", loadNewDocument);
})();

function loadNewDocument() {
    console.log(1);
    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);
    cleanTable();
    //location.reload();
    if (conn != null) {
        conn.send("loadNewTable");
    }
}

function cleanTable() {
    var cells = document.querySelectorAll(".table-cell");
	cells.forEach(cell => {
        cell.innerText = "";
	});
}