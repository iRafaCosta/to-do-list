const inputbox = document.querySelector('#item')
const list = document.querySelector('#item-list')

function addTask(ev){
    ev.preventDefault()
    if(inputbox.value === ''){
        alert('Algo de errado. Verifique se não digitou nada!')
    }else{
        const li = document.createElement('li')
        li.classList.add('itens')
        
        //criando a tarefa
        const span = document.createElement('span')
        span.classList.add('task')
        span.textContent = inputbox.value

        //criando a div dos botões
        const div = document.createElement('div')
        div.classList.add('checked-infos')

        //criando o botão de validar a tarefa
        const check = document.createElement('a')
        check.classList.add('item-checked')
        check.innerHTML = '<i class="fa-regular fa-square"></i>'

        //criando o botão de excluir
        const del = document.createElement('a')
        del.classList.add('item-delete')
        del.innerHTML = '<i class="fa-solid fa-trash"></i>'

        //fazendo os botões funcionarem
        del.addEventListener('click', () =>{
            li.remove()
        })
        check.addEventListener('click', () =>{
            span.classList.add('checked-verification')
            check.innerHTML = '<i class="fa-solid fa-check after-click"></i>'
        })
        //unindo tudo
        div.append(check,span)
        li.append(div,del)
        list.append(li)
    }

    inputbox.value = ''
}

document.querySelector('.submit-btn').addEventListener('click', addTask)