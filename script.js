"use strict"

const [header] = document.getElementsByTagName('header');
const main_area = document.getElementById('main-area');
const top_area = document.getElementById('top-area');

const allLocalStorageKeys = []

const date = () => Date.now();

const getAllLocalStorageKeys = () => {

    Object.keys(localStorage).forEach(key => {
        allLocalStorageKeys.push(key);    
    });

    allLocalStorageKeys.sort();
};

const displayNotes = () => {

    allLocalStorageKeys.forEach(key => {
        const note = localStorage.getItem(key);
        const date = new Date(Number(key))

        const htmlNote = `
        <aside>
        <p><a href="${key}" class='remove-note'>X</a></p>
        <h3>${date.toLocaleDateString("en-GB")} | ${date.toLocaleTimeString("es-ES")} </h3>
        <p>${note}</p>
        </aside>    `
        main_area.insertAdjacentHTML('afterbegin', htmlNote);
    });

    const btnRemoveNote = document.querySelectorAll('.remove-note');

    btnRemoveNote.forEach(btn => {
        btn.addEventListener('click', function(e){
            e.preventDefault();
            const note = e.srcElement.getAttribute('href');
            localStorage.removeItem(note);
        });
    });    
};

const saveNote = text =>  {
    localStorage.setItem(`${date()}`, text);
};

const newNote = () => {
    console.log('New Note');

    const htmlNewNote = `

    <aside id='new-note'>    
    <textarea id="text-area" rows="10"></textarea> 
    <p><button id="save-btn">New Note</button></p>
    </aside>

    `
    top_area.insertAdjacentHTML('afterbegin', htmlNewNote);

    const newNote = document.getElementById('new-note');
    const btnSave = document.getElementById('save-btn');
    const textarea = document.getElementById('text-area');

    btnSave.addEventListener('click', () => {
        console.log('save');
        saveNote(textarea.value)
        newNote.remove();
        header.style = "";
    })
};

const noNotes = () => {
    document.getElementById("new-note-btn").remove();
    const btnHtml = '<p><button id="new-note-btn">New Note</button></p>';
    header.insertAdjacentHTML('beforeend', btnHtml);
};

getAllLocalStorageKeys();
allLocalStorageKeys.length ? displayNotes() : noNotes();

const btnNewNote = document.getElementById('new-note-btn');

btnNewNote.addEventListener('click', () => {
    newNote();
    btnNewNote.setAttribute('disabled', '');
    header.style = "filter:  blur(10px)";
});

