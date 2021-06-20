(function() {
    var newDocument = document.querySelector("#new-document");
    
    newDocument.addEventListener("click", loadNewDocument);
})();

function loadNewDocument() {
    if (type === "Administrator") {
        cleanTable();
        //location.reload();
        if (conn != null) {
            conn.send("loadNewTable");
        }
    }
}

function cleanTable() {
    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);
    var table = document.querySelector("#main-table");
    table.parentNode.removeChild(table);
    tableCreate(30, 30);
}