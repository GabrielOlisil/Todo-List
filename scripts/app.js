

const tasks = getData();

function setData() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function getData() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

const qs = el => document.querySelector(el);
const qsA = el => document.querySelectorAll(el);
const lis = document.getElementsByClassName("task-list")[0].getElementsByTagName('li');

refreshTasks();



document.getElementById("form-tasks").addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.getElementById('name-task').value;
    let description = document.getElementById('description').value

    tasks.push({
        name,
        description,
        completed: false
    });
    document.getElementById('name-task').value = '';
    document.getElementById('description').value = '';
    document.getElementById('name-task').focus();
    refreshTasks();
});



qs('.task-list').addEventListener('click', (event) => {
    let acao = event.target.getAttribute("action")

    let li = event.target.closest('li')

    if (!acao) return

    let actions = {
        toggleShow() {
            li.querySelector("i[action='toggleShow']").classList.toggle('rotated');

            setTimeout(() => {

                li.querySelector('.task-description').classList.toggle("closed");
            }, 100)
        },

        check() {
            tasks[[...lis].indexOf(li)].completed = !tasks[[...lis].indexOf(li)].completed
            refreshTasks();


        },

        exclude() {
            tasks.splice([[...lis].indexOf(li)], 1);
            refreshTasks();

        },
        edit() {
            let editBox = li.querySelector(".edit-box")
            editBox.classList.remove('closed')
            editBox.querySelector('.edit-task').focus();

            editBox.querySelector('.edit-task').value = tasks[[...lis].indexOf(li)].name
            editBox.querySelector('.edit-desc-task').value = tasks[[...lis].indexOf(li)].description
        },

        save() {
            let editBox = li.querySelector(".edit-box")
            tasks[[...lis].indexOf(li)].name = editBox.querySelector('.edit-task').value
            tasks[[...lis].indexOf(li)].description = editBox.querySelector('.edit-desc-task').value
            editBox.classList.add('closed');

            refreshTasks();
        },
        cancel() {
            let editBox = li.querySelector(".edit-box")

            editBox.classList.add('closed');

        }
    }

    actions[acao] && actions[acao]()
});




function refreshTasks() {
    let campo = qs(".task-list")
    campo.innerText = '';
    if (tasks.length == 0) {
        !qs('.task-area').classList.contains('closed') && qs('.task-area').classList.add('closed')
    } else {
        qs('.task-area').classList.contains('closed') && qs('.task-area').classList.remove('closed')
    }
    tasks.forEach(el => {
        const element = qs('.models li').cloneNode(true);
        element.querySelector('.task-name').textContent = el.name;
        element.querySelector('.task-description').textContent = el.description;
        element.querySelector("i[action='check']").className = `fa-solid ${el.completed ? 'fa-square-check' : 'fa-square'}`
        let campo = qs(".task-list")
        campo.append(element);

    });

    setData();
}