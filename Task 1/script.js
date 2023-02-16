const input = document.querySelector('.inputBox input');
const addBtn = document.querySelector('.inputBox button');
const todoList = document.querySelector('.todolist');
const pendingNumber = document.querySelector('.pendingTasks');
const deleteBtn = document.querySelector('.footer button');

input.onkeyup = () =>{
    let userData = input.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
} 

showTasks();


addBtn.onclick = () =>{
    let userData = input.value;

    let getLocalStorage = localStorage.getItem("Todo");
    if(getLocalStorage == null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorage); 
    }
    listArray.push(userData);
    localStorage.setItem("Todo", JSON.stringify(listArray)); 
    showTasks();
}

 function showTasks() {
    let getLocalStorage = localStorage.getItem("Todo");
    if(getLocalStorage == null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorage); 
    }
    pendingNumber.textContent = listArray.length;
    if(listArray.length > 0){
        deleteBtn.classList.add("active");
    }else{
        deleteBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element,index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTasks(${index})";><i class="fa fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    input.value = "";
}

function deleteTasks(index) {
    let getLocalStorage = localStorage.getItem("Todo");
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index,1);
    localStorage.setItem("Todo",JSON.stringify(listArray));
    showTasks();
}

deleteBtn.onclick = () =>{
    listArray = [];
    localStorage.setItem("Todo",JSON.stringify(listArray));
    showTasks();
}

