
const notes =[];

const ModalOverlay = document.querySelector('#modalOverlay');
const addbtn = document.querySelector("#Add")
const Savebtn = document.querySelector("#Save")

addbtn.addEventListener('click',function(){
    ModalOverlay.classList.add('active');
})

Savebtn.addEventListener('click', function(){
    const titleInput = document.querySelector('#Title');
    const textInput = document.querySelector('#textArea');

    const titleValue = titleInput.value
    const textValue = textInput.value
    //CHECK FOR AN EMPTY NOTE!
    if (!titleValue.trim() && !textValue.trim()) return;

    //  CREATING A NEW NOTE
    const note ={
        title: titleValue,
        content:textValue
    };

    notes.push(note);
    renderNotes();

    titleInput.value = '';
    textInput.value = '';

    ModalOverlay.classList.remove('active');
})

const notesContainer = document.querySelector('#notesContainer')

function renderNotes(){
    notesContainer.innerHTML = '';

    notes.forEach(function(note){
        const noteDiv = document.createElement('div');
        const title1 = document.createElement('h3');
        const content1 = document.createElement('p');
        
        title1.innerText = note.title;
        content1.innerText = note.content;

        noteDiv.appendChild(title1);
        noteDiv.appendChild(content1);

        notesContainer.append(noteDiv)
    });

}