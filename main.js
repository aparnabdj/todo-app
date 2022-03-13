//selectors

const todoInput= document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");
const inputSearch=document.querySelector(".todo-search");
const inputValue=document.querySelector(".search-input");
const removeButton=document.querySelector(".remove_btn");

//event listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",deleteCheckEdit);
filterOption.addEventListener("input",filterTodo);
document.addEventListener("DOMContentLoaded",getTodos);
inputSearch.addEventListener("click",searchItem);
removeButton.addEventListener("click",removeAll);
inputValue.addEventListener("input",view);

//functions

function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
     // Todo Div
     const todoDiv=document.createElement("div");
     todoDiv.classList.add("todo");
     //create LI
     const newTodo=document.createElement("input");
     newTodo.value=todoInput.value;
     newTodo.classList.add("todo-item");
     newTodo.type="text";
     newTodo.setAttribute("readonly","readonly");
     todoDiv.appendChild(newTodo);
    
     //saving new values in local storage
    saveLocalTodos(todoInput.value);

     //check button
     const completedButton=document.createElement("button");
     completedButton.innerHTML="<i class='fa fa-check'></i>";
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);

     //trash button
     const trashButton=document.createElement("button");
     trashButton.innerHTML="<i class='fa fa-trash'></i>";
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);

    //edit button
    const editButton=document.createElement("button");
    editButton.innerHTML="<i class='fa-solid fa-pen-to-square'></i>";
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    //append to list
    todoList.appendChild(todoDiv);

    
    //clear todo input value
    todoInput.value="";
}
let text;
function deleteCheckEdit(e)
{
     const item =e.target;
     //delete button
     if(item.classList[0]==="trash-btn"){
        const todo=item.parentElement; 
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
        
     }

     //check button
     if(item.classList[0]==="complete-btn"){
        
         const todo=item.parentElement;
         todo.classList.toggle("completed");
         completedTodos(todo);
     } 

     //edit button
     
     const todo=item.parentElement;
     const newTodo=item.previousElementSibling.previousElementSibling.previousElementSibling; 
    
    
     if(item.classList[0]==="edit-btn")
     {   text=newTodo.value;
        newTodo.removeAttribute("readonly");
        item.innerHTML="<i class='fas fa-save'></i>";
        newTodo.focus();   
        item.classList.toggle("save-btn");
        item.classList.remove("edit-btn");
        } 
        else if(item.classList[0]==="save-btn")
        {   
            newTodo.setAttribute("readonly","readonly");
            item.innerHTML="<i class='fa-solid fa-pen-to-square'></i>";
            item.classList.toggle("edit-btn");
            item.classList.remove("save-btn");
            editLocalTodos(todo,text);
        }
}
 
function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        console.log(e.target.value);
        switch(e.target.value){
            case "all":
                
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        
                        todo.style.display="flex";
                    }
                    else{
                        todo.style.display="none";
                    }
                    break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push({"todo":todo,"completed":false});
    localStorage.setItem("todos",JSON.stringify(todos));  
}

 function getTodos()
 {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo=document.createElement("input");
        newTodo.type="text";
        newTodo.value=todo.todo;
        newTodo.setAttribute("readonly","readonly");
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
   
   
        //check button
        const completedButton=document.createElement("button");
        completedButton.innerHTML="<i class='fa fa-check'></i>";

        completedButton.classList.add("complete-btn");
        if(todo.completed == true)
        {
            todoDiv.classList.toggle("completed");
        }
        
        todoDiv.appendChild(completedButton);
   
        //trash button
        const trashButton=document.createElement("button");
        trashButton.innerHTML="<i class='fa fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
   
        const editButton=document.createElement("button");
        editButton.innerHTML="<i class='fa-solid fa-pen-to-square'></i>";
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);
       //append to list
       todoList.appendChild(todoDiv);
    });
 }

 function removeLocalTodos(todo)
 {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    const todoIndex= todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
 }
 function editLocalTodos(todo,text)
 {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    
    todos.forEach(function(todo1){
    if(todo1.todo==text){
        todo1.todo=todo.children[0].value; 
    }
    });
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
 }
function completedTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    const todoIndex= todo.children[0].innerText;
    
    for(let i = 0; i < todos.length; i++){

        if(todos[i].todo == todoIndex){
            if(todos[i].completed == true){
                todos[i].completed = false

            }else{
                todos[i].completed = true;
            }
            break;

        }
    }
    localStorage.setItem("todos",JSON.stringify(todos)); 
}
 function removeAll()
 {
    todoList.innerHTML="";
    localStorage.removeItem("todos");
 }
 function searchItem(e){
    const todos1=todoList.childNodes;
    const searchText=inputValue.value.toLowerCase();
    console.log(searchText);
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    } 
    let i=0;
    todos.forEach(function(todo){
    
    if(todo.todo==searchText){
        todos1[i].style.display="flex";
    }
    else{
        todos1[i].style.display="none";
    }
    i++;
    });
 }
 function view(){
    const searchText=inputValue.value.toLowerCase();
      const todos=todoList.childNodes;

      todos.forEach(function(todo){
        if(searchText=="")
        {
            todo.style.display="flex";
        }
      });
      
 }