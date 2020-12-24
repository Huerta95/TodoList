const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const deleteButton = document.querySelector("trash-btn");

//El presionar el boton "todo-button", iniciara la funcion addTodo.
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);


function addTodo(event){
    event.preventDefault(); //Esto es para prevenir que la pagina se cargue despues de precionar el boton.
    //Al presionar el boton, se crearan elementos necesarios para la lista de Todos.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("new-todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    todoInput.value = "";
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);
    todoList.appendChild(todoDiv);

    //Botones
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
}

function deleteTodo(e){
    const item = e.target;
    
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.remove();
    }
}