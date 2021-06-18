let customCssButton = document.getElementById('custom-css');
let textArea;
let column;
let row;
let lastTdNodeValue;

customCssButton.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'custom-css') {
        if (e.target.childNodes.length > 1) {
            textArea = e.target.childNodes[1];
            textArea.style.display = 'initial';
            textArea.value = currentTd.style.cssText;
        }
        else {
            textArea = document.createElement('textarea');
            textArea.setAttribute('id', 'cssCode');
            e.target.appendChild(textArea);
            textArea.style.position = 'absolute';
            textArea.style.left = e.target.offsetWidth + 2 + 'px';
            textArea.style.height = '200px';
            textArea.style.width = '200px';
        }
    }

    if (currentTd.classList.contains("column-index")) {
        column = document.querySelectorAll(`.${currentTd.firstChild.nodeValue}`);
        textArea.setAttribute('oninput', 'columnFormatCss()');
        textArea.value = column[0].style.cssText;
    }
    else if (currentTd.classList.contains("row-index")) {
        let nthElement = Number(currentTd.firstChild.nodeValue) + 1;
        row = document.querySelectorAll(`tr:nth-of-type(${nthElement})`)[0].childNodes;
        textArea.setAttribute('oninput', 'rowFormatCss()');
        textArea.value = row[1].style.cssText;
    }
    else {
        textArea.setAttribute('oninput', 'showPreview()');
    }
    
});

function closeTextArea(textArea) {
    if (textArea != null) {
        textArea.style.display = 'none';
    }
}

function columnFormatCss() {
    column.forEach(el => {
        showAllPreview(el);
    });
}

function rowFormatCss() {
    row.forEach(el => {
        showAllPreview(el);
    });
}

function showAllPreview(cell) {
    let cssCode = document.getElementById('cssCode').value;
    cssCode = cssCode.toString().replace(/\n/g, '');

    if (cell != null) {
        if (!cell.classList.contains('row-index')) {
            cell.style.cssText = cssCode;

            conn.send("changeCSS-" + cell.id + "-" + cssCode);
        }
    }
}

function showPreview() {
    if (currentTd != null) {
        let cssCode = document.getElementById('cssCode').value;
        cssCode = cssCode.toString().replace(/\n/g, '');
        
        if (currentTd != null) {
            currentTd.style.cssText = cssCode;

            conn.send("changeCSS-" + currentTd.id + "-" + cssCode);
        }

    }
}