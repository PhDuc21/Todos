var input = document.querySelector('input')
var form = document.querySelector('form')
var todos = document.querySelector('.todos')


form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent website reloading
    let val = input.value.trim()
    if(val) {
        addTodoElement({
            text: val,
        })

    }
    input.value = ''
})

function addTodoElement(todo){  
    var li =  document.createElement('li')
    li.innerHTML= `
    <li class="pl-[20px] pr-[20px] flex justify-between bb-[1px] border-solid border-slate-600 items-center text-[22px] cursor-pointer">
    <span class="whitespace-nowrap overflow-hidden text-ellipsis ">${todo.text}</span>
    <i class="fa-solid fa-trash"></i>
    </li>
    `
    if(todo.status === 'completed'){
        li.setAttribute('class', 'completed')
    }   

    li.addEventListener('click', function(){
        this.classList.toggle('completed') // undo completed
        saveTodoList()
    })

    li.querySelector('i').addEventListener('click', function(){
        this.parentElement.remove()
        saveTodoList()
    })
    
    todos.appendChild(li)
}

function saveTodoList(){
    let todoList = document.querySelectorAll('li')
    let todoStorage = []
    todoList.forEach(function(item){
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')
        console.log(status);
        todoStorage.push({
            text,
            status
        })
    })  

    localStorage.setItem('todolist', JSON.stringify(todoStorage))
}

function init(){
    let data = JSON.parse(localStorage.getItem('todolist'))
    data.forEach(function(item){
        addTodoElement(item)
    }) 
}

init()


