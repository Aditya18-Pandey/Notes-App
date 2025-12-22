
const notes =[];

const ModalOverlay = document.querySelector('#modalOverlay');
const addbtn = document.querySelector("#Add")
const Savebtn = document.querySelector("#Save")
let editIndex = null;

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
    if(editIndex !== null){
        notes[editIndex].title = titleValue;
        notes[editIndex].content = textValue;
        editIndex = null;
    }else{        
        notes.push({
            title: titleValue,
            content:textValue
        });
    };

    renderNotes();

    titleInput.value = '';
    textInput.value = '';

    ModalOverlay.classList.remove('active');
})

const notesContainer = document.querySelector('#notesContainer')

function renderNotes(){
    notesContainer.innerHTML = '';

    notes.forEach((note,index)=>{
        const noteDiv = document.createElement('div');
        const title1 = document.createElement('h3');
        const content1 = document.createElement('p');
        const btndiv = document.createElement('div');

        //Adding Delete button
        const del_btn = document.createElement('button');
        const del_icon = document.createElement('i');
        del_icon.classList.add('fa-solid', 'fa-trash');
        del_btn.appendChild(del_icon);
        
        //Adding Logic for Delete Button
        del_btn.addEventListener('click', function(index){
            notes.splice(index, 1);
            renderNotes();
        });
        
        //Adding Edit Button
        const edit_btn = document.createElement('button');
        const edit_icon = document.createElement('i');
        edit_icon.classList.add('fa-solid', 'fa-pen-to-square');
        edit_btn.appendChild(edit_icon);

        //Adding Edit Logic to Edit button
        edit_btn.addEventListener('click',() => {
            titleInput.value = note.title;
            textInput = note.content;
            
            editIndex = index;
            ModalOverlay.classList.add('active');

        });


        //ADDING CLASSES
        noteDiv.classList.add('note');
        title1.classList.add('note-title');
        content1.classList.add('note-content');
        btndiv.classList.add('note-buttons');
        edit_btn.classList.add('edit_button');
        del_btn.classList.add('del_button');

        
        title1.innerText = note.title;
        content1.innerText = note.content;

        btndiv.appendChild(edit_btn);
        btndiv.appendChild(del_btn);

        noteDiv.appendChild(title1);
        noteDiv.appendChild(content1);
        noteDiv.appendChild(btndiv);

        notesContainer.append(noteDiv)
    });

}