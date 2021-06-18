(function () {
    const url = "../php/getCellData.php";

    // var tableCells = document.querySelectorAll(".table-cell");

    // tableCells.forEach(element => {
    //     const elementID = {
    //         id: element.id
    //     };
    //     // for every table-cell request the data for this cell
    //     //sendRequest(url, { method: 'POST', data: `data=${JSON.stringify(elementID)}` }, loadSavedTable, console.log);
    // });
    sendRequest(url, { method: 'GET' }, loadSavedTable, console.log);
})();

function loadSavedTable(response) {
    if (response.success) {
        if (response.data) {
            //let i = 0;
            response.data.forEach(cellData => {
                var tableCell = document.querySelector(`#${cellData.id}`);
                if (tableCell) {
                    tableCell.classList = cellData.class;
                    tableCell.innerHTML = cellData.innervalue;
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