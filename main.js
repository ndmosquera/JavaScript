let tasks = [];
let info = [];

const task_name = document.querySelector('#task_name');
const task_date = document.querySelector('#task_date');
const task_add = document.querySelector('#task_add');
const task_container = document.querySelector('#task_container');

const json = load();

try {
    info = JSON.parse(json);
} catch (error) {
    info = [];
}
tasks = info ? [...info] : [];

render_task();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    add_task();

})

function add_task(){
    if(task_name.value === '' || task_date.value === ''){
        return;
    }

    if(date_diff(task_add.value) < 0){
        return;
    }

    const new_task = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: task_name.value,
        date: task_date.value,
    };

    tasks.unshift(new_task);

    save(JSON.stringify(tasks));
    task_name.value = "";

    render_task();
}

function date_diff(d){
    const target_date = new Date(d);
    const today = new Date();
    const difference = target_date.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function render_task(){
    const task_HTML = tasks.map(task =>{
        return `
            <div class="task">
                <div class="days">
                    <span class="days-number">${date_diff(task.date)}</span>
                    <span class="days-text">días</span>
                </div>

                <div class="task-name">${task.name}</div>
                <div class="task-date">${task.date}</div>
                <div class="actions">
                    <button class="btn_delete" data-id="${task.id}">Eliminar</button>
                </div>
            </div>
        `;
    })
    task_container.innerHTML = task_HTML.join("");
    document.querySelectorAll('.btn_delete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            tasks = tasks.filter(task => task.id != id);

            save(JSON.stringify(tasks));

            render_task();

        })
    })
}

function save(data){
    localStorage.setItem('items', data);
}

function load(){
    return localStorage.getItem('items')
}