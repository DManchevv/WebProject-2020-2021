// request for saved table's information

function loadSave() {
    const url = "../php/getCellData.php";
    sendRequest(url, { method: 'GET' }, loadSavedTable, console.log);
}

// load saved table information
function loadSavedTable(response) {
    if (response.success) {
        if (response.data) {
            //let i = 0;
            response.data.forEach(cellData => {
                var tableCell = document.querySelector(`#${cellData.id}`);
                if (tableCell) {
                    tableCell.classList = cellData.class;
                    if (cellData.class.includes("locked-cell")) {
						tableCell.removeAttribute("contenteditable");
					}
                    conn.send("changeClass-" + cellData.id + "-" + cellData.class);
                    if (cellData.innervalue !== " ") {  // Load all data to other users
                        tableCell.innerHTML = cellData.innervalue;
                        conn.send("changeCell-" + cellData.id + "-" + cellData.innervalue);
                    }
                    if (cellData.owner !== " ") {
                        tableCell.setAttribute("owner", cellData.owner);
                        conn.send(`loggedUserChangeCell_${cellData.owner}-` + cellData.id + "-something"); // we type in something because thats how the current functionality work (check "loggedUserChangeCell in index")
                    }
                    if (cellData.style != "") {
                        tableCell.style.cssText = cellData.style;
                        conn.send("changeCSS-" + cellData.id + "-" + cellData.style);
                    }
                }
            });
        }
    } else {
        console.log(response);
    }
}