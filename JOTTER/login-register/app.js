


let addButton = document.getElementById('addBtn');

addButton.addEventListener("click", function (e) {

    let notesText = document.getElementById('noteTxt');
    let notesTitle = document.getElementById('noteTitle');
    let notes = localStorage.getItem("notes");

    if (notes == null) {

        notesObj = [];
    }
    else {

        notesObj = JSON.parse(localStorage.getItem('notes'));
    }

    let notesObject = {
        title: notesTitle.value,
        text: notesText.value
    };

    notesObj.push(notesObject);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    notesText.value = "";
    notesTitle.value = "";

    showNotes();
    setCSS();
    setNormalCss();

});

showNotes();
setCSS();
setNormalCss();

function showNotes() {

    let notes = localStorage.getItem('notes');

    if (notes == null) {

        notesObj = [];
    }
    else {

        notesObj = JSON.parse(localStorage.getItem('notes'));
    }

    let html = "";

    if (notesObj.length != 0) {

        notesObj.forEach(function (element, index) {

            html += `
            <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body card_Body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button class="btn btn-primary" onclick="Delete(${index})" >Delete Note</button>
              <button id = "${index}" class="btn btn-danger" onclick="important(${index}); saveCSS(${index})" >Important</button>
            </div>
          </div>
            `

        });

        let noteContainer = document.getElementById('notes');

        noteContainer.innerHTML = html;
    }
    else {

        let noteContainer = document.getElementById('notes');

        noteContainer.innerHTML = `Nothing to show! Please create a note first by using above mentioned "Add a Note" section.`;
    }
}

function Delete(arrayIndex) {

    let notes = localStorage.getItem('notes');
    let CSS = localStorage.getItem('CSS');
    let nCSS = localStorage.getItem('nCSS');

    let notesObj = JSON.parse(notes);

    notesObj.splice(arrayIndex, 1);

    if (CSS != null) {

        let CSSObj = JSON.parse(CSS);
        CSSObj.forEach(function (element, index) {

            if (element == arrayIndex) {
                CSSObj.splice(index, 1);
            }
        });

        CSSObj.forEach(function (element, index) {

            if (element > arrayIndex) {
                CSSObj[index] -= 1;
            }
        });

        localStorage.setItem('CSS', JSON.stringify(CSSObj));

    }

    if (nCSS != null) {
        let nCSSObj = JSON.parse(nCSS);

        nCSSObj.forEach(function (element, index) {

            if (element == arrayIndex) {

                nCSSObj.splice(index, 1);
            }

        });

        nCSSObj.forEach(function (element, index) {

            if (element > arrayIndex) {

                nCSSObj[index] -= 1;
            }
        });

        localStorage.setItem('nCSS', JSON.stringify(nCSSObj));
    }

    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes();
    setCSS();
    setNormalCss();
}

let search = document.getElementById('searchTxt');

search.addEventListener("input", function () {

    let inputTxt = search.value;

    let cards = document.getElementsByClassName('noteCard');

    Array.from(cards).forEach(function (element) {

        let cardTxt = element.querySelector("p").innerText;
        let cardTitle = element.querySelector("h5").innerText;

        if (cardTxt.includes(inputTxt) || cardTitle.includes(inputTxt)) {

            element.style.display = "block";
        }
        else {

            element.style.display = "none";
        }
    });
});

function important(arrayIndex) {

    let card = document.getElementsByClassName('noteCard')[arrayIndex];

    card.style.backgroundColor = 'red';
    card.style.boxShadow = '3px 3px 3px 0px';
    card.style.scale = '1.06';
    card.style.transition = 'all 200ms';

    let button = document.getElementById(arrayIndex);

    let cardBody = card.querySelector('.card_Body');

    let newBtn = document.createElement('button');

    newBtn.setAttribute('id', `${arrayIndex}`);
    newBtn.setAttribute('class', 'btn btn-primary');
    newBtn.setAttribute('onclick', `Normal(${arrayIndex}); saveNormalCss(${arrayIndex})`);
    newBtn.innerText = 'Normal';

    cardBody.replaceChild(newBtn, button);

    let nCss = localStorage.getItem('nCSS');
    if (nCss != null) {

        nCssObj = JSON.parse(nCss);
        nCssObj.forEach(function (element, index) {

            if (element == arrayIndex) {
                nCssObj.splice(index, 1);
                localStorage.setItem('nCSS', JSON.stringify(nCssObj));
            }
            else {
                //nothing
            }
        });
    }
    else {
        //nothing
    }

}

function saveCSS(arrayIndex) {

    let css = localStorage.getItem('CSS');

    if (css == null) {

        cssObj = [];
    }
    else {

        cssObj = JSON.parse(css);
    }

    cssObj.push(arrayIndex);
    localStorage.setItem('CSS', JSON.stringify(cssObj));
}

function setCSS() {

    let css = localStorage.getItem('CSS');

    if (css == null) {

        cssObj = [];
    }
    else {

        cssObj = JSON.parse(css);
    }

    if (cssObj.length != 0) {

        cssObj.forEach(function (element) {

            important(element);
        });
    }
    else {
        //nothing
    }

}

function Normal(arrayIndex) {

    let card = document.getElementsByClassName('noteCard')[arrayIndex];

    card.style.backgroundColor = 'white';
    card.style.boxShadow = '0px 0px 0px 0px';
    card.style.scale = '1';
    card.style.transition = 'all 200ms';

    let button = document.getElementById(arrayIndex);

    let cardBody = card.querySelector('.card_Body');

    let newBtn = document.createElement('button');

    newBtn.setAttribute('id', `${arrayIndex}`);
    newBtn.setAttribute('class', 'btn btn-danger');
    newBtn.setAttribute('onclick', `important(${arrayIndex}); saveCSS(${arrayIndex})`);
    newBtn.innerText = 'Important';

    cardBody.replaceChild(newBtn, button);

    let Css = localStorage.getItem('CSS');
    if (Css != null) {

        CssObj = JSON.parse(Css);
        CssObj.forEach(function (element, index) {

            if (element == arrayIndex) {
                CssObj.splice(index, 1);
                localStorage.setItem('CSS', JSON.stringify(CssObj));
            }
            else {
                //nothing
            }
        });
    }
    else {
        //nothing
    }

}

function saveNormalCss(arrayIndex) {

    let nCss = localStorage.getItem('nCSS');

    if (nCss == null) {

        nCssObj = [];
    }
    else {

        nCssObj = JSON.parse(nCss);
    }

    nCssObj.push(arrayIndex);
    localStorage.setItem('nCSS', JSON.stringify(nCssObj));

}

function setNormalCss() {

    let nCss = localStorage.getItem('nCSS');

    if (nCss == null) {

        nCssObj = [];
    }
    else {

        nCssObj = JSON.parse(nCss);
    }

    if (nCssObj.length != 0) {

        nCssObj.forEach(function (element) {

            Normal(element);
        });
    }
    else {
        //nothing
    }

}

