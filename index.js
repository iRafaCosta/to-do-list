let lists =[]

function createNewtaskContainer(id){
    const container = document.createElement('li')
    container.classList.add('itens')
    container.id = `itens-${id}`
    return container
}

function createNewtaskContent(item){
    const title = document.createElement('span')
    title.classList.add('task')
    title.textContent = item
    return title
}

function createNewtaskDiv(){
    const div = document.createElement('div')
    div.classList.add('icons')
    return div
}

function createNewtaskCheckedBtn(){
    const checkedBtn = document.createElement('a')
    checkedBtn.classList.add('item-checked')
    checkedBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    checkedBtn.addEventListener('click', (ev) =>{
        ev.target.parentElement.parentElement.parentElement.classList.add('checked-verification')
    })
    return checkedBtn
}


function createNewtaskDeleteBtn(id){
    const deleteBtn = document.createElement('a')
    deleteBtn.classList.add('delete-item')
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteBtn.addEventListener('click', async () =>{
        await fetch(`http://localhost:3000/tasks/${id}`), {method:'DELETE'}
        deleteBtn.parentElement.parentElement.remove()
        const indexToRemove = lists.findIndex((t) => t.id === id)
        lists.splice(indexToRemove,1)
    })
    return deleteBtn
}

async function fetchList(){
    return await fetch('http://localhost:3000/tasks').then(res => res.json())
}

async function renderList(task){
    const content = createNewtaskContent(task.name)
    const container = createNewtaskContainer(task.id)
    const checkedBtn = createNewtaskCheckedBtn()
    const deleteBtn = createNewtaskDeleteBtn(task.id)
    const div = createNewtaskDiv()

    container.append(content,div)
    div.append(checkedBtn,deleteBtn)
    document.querySelector('#item-list').append(container)
}

async function saveTask() {

    const name = document.querySelector("#item").value;

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({name}),
      headers: {
        'Content-type': 'application/json'
      }
    })

    const task = await response.json();
    lists.push(task);
    renderList(task);
    
}

async function setup(){
    const results = await fetchList()
    lists.push(...results)
    lists.forEach(renderList)
}


document.querySelector('.submit-btn').addEventListener('click', (ev) =>{
    ev.preventDefault()
    const inputbox = document.querySelector('#item')
    if(inputbox.value === ''){
        window.alert('Campo obrigatório. Insira algo para prosseguir!')
    }else{
        saveTask()
    }
})

document.addEventListener('DOMContentLoaded', setup)