
const notes =JSON.parse(localStorage.getItem('notes')) || [];

const ModalOverlay = document.querySelector('#modalOverlay');
const addbtn = document.querySelector("#Add");
const Savebtn = document.querySelector("#Save");
const close_btnn = document.querySelector('#close_btn');
const sunIcon = document.querySelector("#light-btn");
const moonIcon = document.querySelector("#dark-btn");
const body = document.body;

let editIndex = null;

//light mode Logic --->
sunIcon.addEventListener('click', ()=>{
    body.classList.remove('dark');
    body.classList.add('light');
    
    sunIcon.classList.add('active');
    moonIcon.classList.remove('active');
});

//dark mode Logic --->
moonIcon.addEventListener('click', ()=>{
    body.classList.remove('light');
    body.classList.add('dark');
    
    moonIcon.classList.add('active');
    sunIcon.classList.remove('active');
});


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
    
    savetoLocalStorage();
    renderNotes();
    
    titleInput.value = '';
    textInput.value = '';
    
    ModalOverlay.classList.remove('active');
    Savebtn.innerText = 'Save';
})

close_btnn.addEventListener('click', function(){
    //hide the modal 
    ModalOverlay.classList.remove('active');

    //clearing the inputs
    document.querySelector('#Title').value = '';
    document.querySelector('#textArea').value = '';

    editIndex = null;
    Savebtn.innerText = 'Save';
});

//Function for saving notes to local storage
function savetoLocalStorage(){
    localStorage.setItem('notes',JSON.stringify(notes));
}
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
        del_btn.addEventListener('click', function(){
            notes.splice(index, 1);
            savetoLocalStorage();
            renderNotes();
        });
        
        //Adding Edit Button
        const edit_btn = document.createElement('button');
        const edit_icon = document.createElement('i');
        edit_icon.classList.add('fa-solid', 'fa-pen-to-square');
        edit_btn.appendChild(edit_icon);
        
        //Adding Edit Logic to Edit button
        edit_btn.addEventListener('click',() => {
            const titleInput = document.querySelector('#Title');
            const textInput = document.querySelector('#textArea');
            
            
            titleInput.value = note.title;
            textInput.value = note.content;
            
            editIndex = index;
            Savebtn.innerText = 'Update';
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

        //APPENDING CHILDS TO RESPECTIVE PARENTS
        btndiv.appendChild(edit_btn);
        btndiv.appendChild(del_btn);

        noteDiv.appendChild(title1);
        noteDiv.appendChild(content1);
        noteDiv.appendChild(btndiv);

        notesContainer.append(noteDiv)
    });

}
renderNotes();