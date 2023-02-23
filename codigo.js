

let no_todo = prompt("Por favor ingrese la cantidad de tareas que preve para esta semana")
let todo = []

for (let i=1; i <= no_todo; i++){
    let task
    let priority
    let temp
    task = prompt("Por favor ingrese una tarea")
    priority = prompt("De 1 a 10, ¿Qué tan prioritaria es la tarea? (1 es la mayor prioridad)")
    temp = {tarea: task, prioridad:priority}
    todo.push(temp)
}

function sort_list(array){
    array.sort((a,b) => {
        if (a.prioridad < b.prioridad){
            return -1;
        }
        if (a.prioridad > b.prioridad){
            return 1;
        }
        return 0;
    });
}

sort_list(todo)


let mensaje = "Sus tareas para esta semanas ordenadas por prioridad son:\n"
let frase

for (let i=0; i < no_todo; i++){
    frase = todo[i].tarea
    mensaje = mensaje + " " + frase + "\n"

}

alert(mensaje)