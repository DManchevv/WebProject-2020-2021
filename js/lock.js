function setContextMenus() {
    var rows = document.querySelectorAll(".row-index");
    var columns = document.querySelectorAll(".column-index");

    columns.forEach(element => {
        element.addEventListener("contextmenu", e => {
            e.preventDefault();
            openColumnContextMenu(element);
        })
    });

    rows.forEach(element => {
        element.addEventListener("contextmenu", e => {
            e.preventDefault();
            openRowContextMenu(element);
        })
    });
};

function openColumnContextMenu(element) {
    if (contextMenu.classList.contains("context-menu-hidden")) {
        currentTd = element;
        contextMenu.classList.toggle("context-menu-hidden");
        fixUpColumns(element);
        
    }
    else {
        if (currentTd != element) {
            currentTd = element;
            fixUpColumns(element);
        }
    }

    closeTextArea(textArea);
}

function fixUpColumns(element) {
    contextMenu.style.position = "absolute";    //sets the position of the column context menu
    contextMenu.style.top = "auto";
    contextMenu.style.left = "inherit";
    removeInsertRowOptions(contextMenu);

    if (contextMenu.querySelector('#insert-column') == null) {
        let insertColumn = document.createElement('span');
        insertColumn.setAttribute('id','insert-column');
        insertColumn.textContent = "Insert column";
        insertColumn.addEventListener('click', e => {
            let currentColumn = e.target.parentElement.parentElement;
            conn.send("insertColumn-"+currentColumn.cellIndex);
            insertNewColumn(currentColumn.cellIndex);
            fixFollowingColumns(currentColumn.cellIndex);
        });

        contextMenu.appendChild(insertColumn);
    }

    element.appendChild(contextMenu);
    var column = document.querySelectorAll(`.${element.innerText[0]}`);

    column.forEach(el => {
        if (el.hasAttribute("contenteditable")) {
            cellLock.innerHTML = "Lock";
        }
        else {
            cellLock.innerHTML = "Unlock";
        }
    });
}

function openRowContextMenu(element) {
    if (contextMenu.classList.contains("context-menu-hidden")) {
        currentTd = element;
        contextMenu.classList.toggle("context-menu-hidden");
        fixUpRows(element);
    }
    else {
        if (currentTd != element) {
            currentTd = element;
            fixUpRows(element);
        }
    }

    closeTextArea(textArea);
}

function fixUpRows(element) {
    contextMenu.style.position = "absolute";    //sets the position of the row context menu
    contextMenu.style.top = "auto";             //
    contextMenu.style.left = "inherit";         //
    removeInsertColumnOptions(contextMenu);

    if (contextMenu.querySelector('#insert-row') == null) {
        let insertRow = document.createElement('span');
        insertRow.setAttribute('id','insert-row');
        insertRow.textContent = "Insert row";
        insertRow.addEventListener('click', e => {
            let currentRow = e.target.parentElement.parentElement.parentElement;
            conn.send("insertRow-"+currentRow.rowIndex);
            insertNewRow(currentRow.rowIndex);
            fixFollowingRows(currentRow.rowIndex);
        });

        contextMenu.appendChild(insertRow);
    }

    element.appendChild(contextMenu);
    var nthElement = Number(element.firstChild.nodeValue) + 1;
    var row = document.querySelectorAll(`tr:nth-of-type(${nthElement})`)[0].childNodes;
    row.forEach(el => {
        if (el.classList.contains("row-index")) {
            return;
        }
        if (el.hasAttribute("contenteditable")) {
            cellLock.innerHTML = "Lock";
        }
        else {
            cellLock.innerHTML = "Unlock";
        }
    });
}

function columnLockUnlock(column) {
    if (currentTd.classList.contains("columns-locked")) {
        currentTd.classList.remove("columns-locked");
        column.forEach(el => {
            /*if (el.hasAttribute("contenteditable")) {
                el.removeAttribute('contenteditable');
                el.classList.add('locked-cell');
                cellLock.innerHTML = "Unlock";
            }*/
            //else {
                el.setAttribute('contenteditable', "");
                el.classList.remove('locked-cell');
                cellLock.innerHTML = "Lock";
            //}
        });
    } else {
        currentTd.classList.add("columns-locked");
        column.forEach(el => {
            if (el.hasAttribute("contenteditable")) {
                el.removeAttribute('contenteditable');
                el.classList.add('locked-cell');
                cellLock.innerHTML = "Unlock";
            }
            /*else {
                el.setAttribute('contenteditable', "");
                el.classList.remove('locked-cell');
                cellLock.innerHTML = "Lock";
            }*/
        });
    }
}

function rowLockUnlock(row) {
    if (currentTd.classList.contains("rows-locked")) {
        currentTd.classList.remove("rows-locked");
        row.forEach(el => {
            if (el.classList.contains("row-index")) {
                return;
            }
            /*if (el.hasAttribute("contenteditable")) {
                el.removeAttribute('contenteditable');
                el.classList.add('locked-cell');
                cellLock.innerHTML = "Unlock";
            }*/
            else {
                el.setAttribute('contenteditable', "");
                el.classList.remove('locked-cell');
                cellLock.innerHTML = "Lock";
            }
        });
    } else {
        currentTd.classList.add("rows-locked");
        row.forEach(el => {
            if (el.classList.contains("row-index")) {
                return;
            }
            if (el.hasAttribute("contenteditable")) {
                el.removeAttribute('contenteditable');
                el.classList.add('locked-cell');
                cellLock.innerHTML = "Unlock";
            }
            /*else {
                el.setAttribute('contenteditable', "");
                el.classList.remove('locked-cell');
                cellLock.innerHTML = "Lock";
            }*/
        });
    }
}