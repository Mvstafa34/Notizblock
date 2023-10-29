let notesTitle = [];
let notesText = [];

let deletedNotesTitle = [];
let deletedNotesText = [];


function loadAllNotes() {
    load();
    let myNotes = document.getElementById('myNotes');

    myNotes.innerHTML = '';

    for (let i = 0; i < notesTitle.length; i++) {
        myNotes.innerHTML += /*html*/ `
        <div class="noteContainer">
            <h1>${notesTitle[i]}</h1>
            <p>${notesText[i]}</p>
            <img onclick="deleteNote(${i})" src="./img/icons8-löschen1-100-black.png">
        </div>
        `
    }
}


function saveNote() {
    let myNotes = document.getElementById('myNotes');
    let title = document.getElementById('title');
    let text = document.getElementById('text');

    if (title.value || text.value) {
        notesTitle.push(title.value);
        notesText.push(text.value);

        title.value = '';
        text.value = '';
    } else {
        alert('Die Notiz darf nicht leer sein!')
    }
    save();
    loadAllNotes();
}


function cleanNote() {
    let title = document.getElementById('title');
    let text = document.getElementById('text');

    title.value = '';
    text.value = '';
}


function deleteNote(i) {
    deletedNotesTitle.push(notesTitle[i]);
    deletedNotesText.push(notesText[i]);
    notesTitle.splice(i, 1);
    notesText.splice(i, 1);

    save();
    loadAllNotes();
}


function loadDeletedNotesPage() {
    toggleMenu();
    document.getElementById('section-new').classList.add('d-none');
    document.getElementById('section-notes').classList.add('d-none');
    document.getElementById('trash-header').classList.remove('d-none');
    document.getElementById('section-trash').classList.remove('d-none');

    loadAllDeletedNotes()
}


function loadMyNotesPage() {
    toggleMenu();
    document.getElementById('section-new').classList.remove('d-none');
    document.getElementById('section-notes').classList.remove('d-none');
    document.getElementById('trash-header').classList.add('d-none');
    document.getElementById('section-trash').classList.add('d-none');

    loadAllNotes();
}


function loadAllDeletedNotes() {
    load();
    let myDeletedNotes = document.getElementById('myDeletedNotes');

    myDeletedNotes.innerHTML = '';

    for (let i = 0; i < deletedNotesTitle.length; i++) {
        myDeletedNotes.innerHTML += /*html*/ `
        <div class="noteContainer">
            <h1>${deletedNotesTitle[i]}</h1>
            <p>${deletedNotesText[i]}</p>
            <div class="buttons flex-end">
                <img class="trash-buttons" onclick="restoreNote(${i})" src="./img/icons8-wiederherstellen-100-black.png">
                <img class="trash-buttons" onclick="deleteNoteForEver(${i})" src="./img/icons8-müll-löschen-100-black.png">
            </div>
        </div>
        `
    }
}


function deleteNoteForEver(i) {
    deletedNotesTitle.splice(i, 1);
    deletedNotesText.splice(i, 1);

    save();
    loadAllDeletedNotes();
}


function restoreNote(i) {
    notesTitle.push(deletedNotesTitle[i]);
    notesText.push(deletedNotesText[i]);
    deletedNotesTitle.splice(i, 1);
    deletedNotesText.splice(i, 1);

    save();
    loadAllDeletedNotes();
}


function save() {
    let notesTitleAsText = JSON.stringify(notesTitle);
    localStorage.setItem('notesTitle', notesTitleAsText);

    let notesTextAsText = JSON.stringify(notesText);
    localStorage.setItem('notesText', notesTextAsText);

    let deletedNotesTitleAsText = JSON.stringify(deletedNotesTitle);
    localStorage.setItem('deletedNotesTitle', deletedNotesTitleAsText);

    let deletedNotesTextAsText = JSON.stringify(deletedNotesText);
    localStorage.setItem('deletedNotesText', deletedNotesTextAsText);
}


function load() {
    let notesTitleAsText = localStorage.getItem('notesTitle');
    let notesTextAsText = localStorage.getItem('notesText');
    if (notesTitleAsText && notesTextAsText) {
        notesTitle = JSON.parse(notesTitleAsText);
        notesText = JSON.parse(notesTextAsText);
    }

    let deletedNotesTitleAsText = localStorage.getItem('deletedNotesTitle');
    let deletedNotesTextAsText = localStorage.getItem('deletedNotesText');
    if (deletedNotesTitleAsText && deletedNotesTextAsText) {
        deletedNotesTitle = JSON.parse(deletedNotesTitleAsText);
        deletedNotesText = JSON.parse(deletedNotesTextAsText);
    }
}


function toggleMenu() {
    document.getElementById('nav').classList.toggle('d-none-responsive');
    document.getElementById('openMenu').classList.toggle('d-none');
    document.getElementById('closeMenu').classList.toggle('d-none');
}

