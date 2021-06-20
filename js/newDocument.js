// adding listener to "New Document" button
(function() {
    var newDocument = document.querySelector("#new-document");
    
    newDocument.addEventListener("click", loadNewDocument);
})();

// clearing table and loading empty one
function loadNewDocument() {
    if (type === "Administrator") {
        cleanTable();

        if (conn != null) {
            conn.send("loadNewTable");
        }
    }
}

// cleaning the table and updating database information
function cleanTable() {
    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);
    var table = document.querySelector("#main-table");
    table.parentNode.removeChild(table);
    tableCreate(30, 30);
}