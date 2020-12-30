const todoInput = document.querySelector(".todo-input");
const listInput = document.querySelector(".list-name");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filters");

//El presionar el boton "todo-button", iniciara la funcion addTodo.
document.addEventListener('DOMContentLoaded', getTodos());
document.addEventListener('DOMContentLoaded', getList());
listInput.addEventListener('change', saveList);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);


function addTodo(event){
    event.preventDefault(); //Esto es para prevenir que la pagina se cargue despues de precionar el boton.
    //Al presionar el boton, se crearan elementos necesarios para la lista de Todos.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("new-todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    //Añadiremos el todo al LocalStorage
    todoInput.value = "";
    newTodo.classList.add("todo-item");
    saveLocalTodos(newTodo.innerText);

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
    
    //Esto codigo reconoce si presionas el boton de basura.
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("removeAnim");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        removeLocalTodo(todo);
    }

    //Este reconoce si presionas la palomita.
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        item.classList.toggle('check-completed');
        completedLocalTodo(todo);
    }
}

//Esta funcion se encarga de 
function filterTodo(e){
    const filter = e.target;
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        switch (filter.classList[0]){
            case "all-button":
                todo.style.display = "grid";
                break;

            case "completed-button":
                if(todo.classList.contains("completed")){
                    todo.style.display = "grid";
                }else todo.style.display = "none";
                break;
            
            case "progress-button":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "grid";
                }else todo.style.display = "none";
                break;
        }
    })
}

function saveLocalTodos(todo){
    //Primero revisamos si no hay un array guardado
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoArray = {
        text: todo,
        completed: false
    };

    todos.push(todoArray);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Primero revisamos si no hay un array guardado
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //Cada Todo se creara basado en el Array guardado en el Local Storage
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("new-todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text;

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

        if(todo.completed === true){
            todoDiv.classList.toggle('completed');
            completedButton.classList.toggle('check-completed');
        }
    })
}

function removeLocalTodo(todo){
    let todos;

    todos = JSON.parse(localStorage.getItem('todos'));

    const todoIndex = todos.findIndex(x => x.text === todo.children[0].textContent);

    console.log(todoIndex);

    todos.splice(todoIndex,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function completedLocalTodo(todo){
    let todos;

    todos = JSON.parse(localStorage.getItem('todos'));

    const todoIndex = todos.findIndex(x => x.text === todo.children[0].textContent);

    console.log(todo.children[0].innerText);

    if(todos[todoIndex].completed){
        todos[todoIndex].completed = false;
    }else todos[todoIndex].completed = true;

    localStorage.setItem('todos', JSON.stringify(todos));
}

//Nombre de la lista
function getList(){
    let listname;

    if(localStorage.getItem('list') === null){
        listname = "To-do List";
    }else{
        listname = localStorage.getItem('list');
    }

    listInput.value = listname;
}

function saveList(e){
    localStorage.setItem('list', e.target.value);
}
