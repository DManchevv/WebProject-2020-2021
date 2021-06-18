(function() {
    var newDocument = document.querySelector("#new-document");

    newDocument.addEventListener("click", loadNewDocument);
})();

function loadNewDocument() {
    var cleanTableUrl = "../php/cleanTabledb.php";
    sendRequest(cleanTableUrl, { method: 'POST' }, load, console.log);
    location.reload();
}