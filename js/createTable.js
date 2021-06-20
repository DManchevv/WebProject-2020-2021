let contextMenu = document.getElementById('context-menu'); 
let cellLock = document.getElementById('lock-cell');
let currentTd = null;
let tbl;

cellLock.addEventListener('click', () => {
    if (currentTd != null) {
        if (currentTd.hasAttribute('contenteditable')) {
            if (username) {
                currentTd.setAttribute("owner", username);
            }
            currentTd.removeAttribute('contenteditable');
            currentTd.classList.add('locked-cell');
            cellLock.innerHTML = "Unlock";
            conn.send("changeClass-" + currentTd.id + "-" + currentTd.classList.value);
            conn.send(`loggedUserChangeCell_${username}-` + currentTd.id + "-" + "something");
        } else if (currentTd.classList.contains("column-index")) { // Added by Velin
            var column = document.querySelectorAll(`.${currentTd.firstChild.nodeValue}`);
            columnLockUnlock(column);
        } else if (currentTd.classList.contains("row-index")) { // Added by Velin
            var nthElement = Number(currentTd.firstChild.nodeValue) + 1;
            var row = document.querySelectorAll(`tr:nth-of-type(${nthElement})`)[0].childNodes;
            rowLockUnlock(row);
        }
        else {
            // Checks to see if there is a user owning the current cell
            if (!currentTd.hasAttribute("owner") || currentTd.getAttribute("owner") === username) {
                if (currentTd.hasAttribute("owner")) {
                    currentTd.removeAttribute("owner");
                }
                currentTd.setAttribute('contenteditable', "");
                currentTd.classList.remove('locked-cell');
                cellLock.innerHTML = "Lock";
                conn.send("changeClass-" + currentTd.id + "-" + currentTd.classList.value);
                // Here we don't send anything as a third info so that we delete the owner
                conn.send(`loggedUserChangeCell_${username}-` + currentTd.id + "-" + "");
            }
        }
    }
})

function tableCreate(rows, columns) {
    tbl = document.createElement('table');
    tbl.classList = "main-table";
    tbl.setAttribute('id', 'main-table');
    tbl.setAttribute('border', '1');

    tbl.addEventListener('contextmenu', e => {
        e.preventDefault();
    })

    tbl.addEventListener('click', e => {
        let inside = (e.target.closest('.context-menu'));
        if (!inside) {
            if (!contextMenu.classList.contains("context-menu-hidden")) {
                contextMenu.classList.toggle("context-menu-hidden");   
                currentTd = null;
            }

            removeInsertOptions(contextMenu);

            closeTextArea();
        }
    })
    
    let tbdy = document.createElement('tbody');

    let tr = document.createElement('tr');
    for (let j = 0; j < columns; j++) {
        let td = document.createElement('td');
        td.classList = "column-index";
        td.innerHTML = columnToLetter(j);
        tr.appendChild(td);
    }

    tbdy.appendChild(tr);

    for (let i = 1; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            let td = document.createElement('td');
        
            if (j != 0) {
                td.setAttribute("contenteditable", ""); // so as not to make the indexed rows editable Edit Velin
                td.classList = "table-cell";
                td.id = columnToLetter(j).toString() + i.toString();     //Edit Velin
                td.classList.add(columnToLetter(j));                    //-----------
                td.classList.add(i);                                    //-----------
                
                td.addEventListener('contextmenu', () => { // Edit Velin only add this specific context menu on table-cell 
                    openContextMenu(td);
                });

                td.addEventListener('click', () => {

                    if (currentTd != td) {
                        conn.send('selectedCell-' + td.id);

                        if (currentTd != null) {
                            conn.send('oldCell-' + currentTd.id);
                        }

                        currentTd = td;
                    }
                });

                td.addEventListener('input', () => {
                    if (conn != null) {
                        conn.send("changeCell-" + td.id + "-" + td.innerText);
                    }

                    if (!isNaN(td.innerText)) {
                        td.style.textAlign = "right";
                        conn.send("addStyle-" + td.id + "-text~align: right");
                    }
                    else {
                        td.style.textAlign = "left";
                        conn.send("addStyle-" + td.id + "-text~align: left");
                    }
                    
                });
            }
            else {
                td.classList = "row-index";
                td.innerHTML = i.toString();
            }

            td.appendChild(document.createTextNode('\u0020'));
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    let tableWrapper = document.getElementById('tableWrapper');
    
    tableWrapper.appendChild(tbl);
}

function columnToLetter(column)
{
  let temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function openContextMenu(td) {
    // If the menu is not opened at the moment of the click
    if (contextMenu.classList.contains("context-menu-hidden")) {
        currentTd = td;
        contextMenu.classList.toggle("context-menu-hidden");
        let position = td.getBoundingClientRect();
        let x = position.right;
        let y = position.top + window.scrollY;
        contextMenu.style.position = "absolute";
        contextMenu.style.top = y + 'px';
        contextMenu.style.left = x + 'px';
        removeInsertOptions(contextMenu);

        if (td.hasAttribute("contenteditable")) {
            cellLock.innerHTML = "Lock";
        }
        else {
            cellLock.innerHTML = "Unlock";
        }

        closeTextArea(textArea);
    }
    // If the menu is opened at the moment of the click
    else {
        // If we clicked different cell from the one that is active at the moment
        if (currentTd != td) {
            contextMenu.classList.toggle("context-menu-hidden");
            currentTd = td;
            let position = td.getBoundingClientRect();
            let x = position.right;
            let y = position.top + window.scrollY;
            contextMenu.classList.toggle("context-menu-hidden");
            contextMenu.style.position = "absolute";
            contextMenu.style.top = y + 'px';
            contextMenu.style.left = x + 'px';
            removeInsertOptions(contextMenu);

            if (td.hasAttribute("contenteditable")) {
                cellLock.innerHTML = "Lock";
            }
            else {
                cellLock.innerHTML = "Unlock";
            }

            closeTextArea(textArea);
        }
    }
}

function importCSV() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var rows = e.target.result.split("\n");
                for (var i = 1; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        var row = document.getElementById('main-table').rows[i];
                        for (var j = 1; j < cells.length; j++) {
                            var cell = row.cells[j];
                            if (cell != null) {
                                cell.innerText = cells[j];
                                conn.send("changeCell-" + cell.id + "-" + cell.innerText);
                            }
                        }
                    }
                }
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

function removeInsertOptions(contextMenu) {
    removeInsertRowOptions(contextMenu);
    removeInsertColumnOptions(contextMenu);
}

function removeInsertRowOptions(contextMenu) {
    if (contextMenu.querySelector('#insert-row') != null) {
        contextMenu.removeChild(contextMenu.querySelector('#insert-row'));
    }
}

function removeInsertColumnOptions(contextMenu) {
    if (contextMenu.querySelector('#insert-column') != null) {
        contextMenu.removeChild(contextMenu.querySelector('#insert-column'));
    }
}