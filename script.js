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

    return allLocalStorageKeys.length
};


const displayNotes = () => {

    allLocalStorageKeys.forEach(key => {
        const note = localStorage.getItem(key);
        const date = new Date(Number(key))

        const htmlNote = `
        <aside id='${key}'>
        <p><a href="#" class='remove-note'>X</a></p>
        <h3>${date.toLocaleDateString("en-GB")} | ${date.toLocaleTimeString("es-ES")} </h3>
        <p>${note}</p>
        </aside>    `
        main_area.insertAdjacentHTML('afterbegin', htmlNote);
    });

    const btnRemoveNote = document.querySelectorAll('.remove-note');

    btnRemoveNote.forEach(btn => {
        btn.addEventListener('click', function(e){
            e.preventDefault(); 
            const note = e.target.closest('aside');
            note.remove();
            localStorage.removeItem(note.id);            
            if (localStorage.length === 0) location.reload();
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
    <p><button id="save-btn">Save Note</button></p>
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
        location.reload();
    })
        
};

const noNotes = () => {
    document.getElementById("menu").remove();
    const btnHtml = '<p><button id="new-note-btn">New Note</button></p>';
    header.insertAdjacentHTML('beforeend', btnHtml);
};

const isListEmpty = getAllLocalStorageKeys();

isListEmpty ? displayNotes() : noNotes();

const btnNewNote = document.getElementById('new-note-btn');
const btnExport = document.getElementById('export-btn');

btnNewNote.addEventListener('click', (e) => {
    e.preventDefault();
    newNote();
    btnNewNote.setAttribute('disabled', '');
});

btnExport?.addEventListener('click', (e) => {
    const json = JSON.stringify(localStorage);
    const link = e.target;
    const file = new Blob([json], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = `simpleNotes-export-${date()}.json`;
});
