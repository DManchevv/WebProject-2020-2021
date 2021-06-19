(function () {
    

    // var tableCells = document.querySelectorAll(".table-cell");

    // tableCells.forEach(element => {
    //     const elementID = {
    //         id: element.id
    //     };
    //     // for every table-cell request the data for this cell
    //     //sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(elementID)}` }, loadSavedTable, console.log);
    // });
    
})();

function loadSave() {
    const url = "../php/getCellData.php";
    sendRequest(url, { method: 'GET' }, loadSavedTable, console.log);
}

function loadSavedTable(response) {
    if (response.success) {
        if (response.data) {
            //let i = 0;
            response.data.forEach(cellData => {
                var tableCell = document.querySelector(`#${cellData.id}`);
                if (tableCell) {
                    //console.log(tableCell);
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
                //i++;
                // for every table-cell request the data for this cell
                //sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(elementID)}` }, loadSavedTable, console.log);
            });

            // then load the data again
            /*var cellData = response.data;
            var tableCell = document.querySelector(`#${cellData.id}`);
            tableCell.classList = cellData.class;
            tableCell.innerHTML = cellData.innervalue;*/
        }
    } else {
        console.log(response);
    }
}