import './index.scss';
const listTask = document.querySelector(".list-task");
const newTaskInput = document.querySelector(".new-task__input");
const addBtn = document.querySelector(".add-btn");
const btnColor = document.querySelector(".btn-color");


const listTaskData = [
    {
        id: 1,
        text: "Забрать документы",
        comleted: true,
        color: "green",
    },
    {
        id: 2,
        text: "Парикмахер",
        comleted: false,
        color: "pink",
    },
    {
        id: 3,
        text: "Заказать букет маме",
        comleted: false,
        color: "yellow",
    },
    {
        id: 4,
        text: "Собрание в школе",
        comleted: true,
        color: "blue",
    },
    {
        id: 5,
        text: "Купить купальник",
        color: "yellow",
        comleted: true,
        color: "green",

    },
]

renderListTask();
addBtn.addEventListener("click", () => {
    const text = newTaskInput.value;

    if (text) {
        const newTask = {
            id: Date.now(),
            text,
            comleted: false,
            color: "red",
        };

        listTaskData.push(newTask);

        renderTask(newTask);

        newTaskInput.value = "";
    }
})

function renderListTask() {
    listTaskData.forEach((task) => renderTask(task));
}
function renderTask(task) {
    const taskElem = document.createElement("div");
    taskElem.classList.add("list", "btn-color", `${task.color}`)

    taskElem.setAttribute("data-id", task.id);

    const taskHTML = `
    <label>
        <input type="checkbox" ${task.comleted && "checked"}>
        <span>${task.text}</span>
    </label>`;
    taskElem.insertAdjacentHTML("beforeend", taskHTML);

    listTask.append(taskElem);

    taskElem.addEventListener("click", (ev) => {
        ev.preventDefault();

        // console.log(ev.currentTarget);

        const taskElem = ev.currentTarget; /*показывает div на который происходит клик */
        // некорректно работает, при клике на checkbox не меняет статус
        const inputElem = taskElem.querySelector("input");
        if (inputElem.checked) {
            inputElem.checked = false;
        } else {
            inputElem.checked = true;
        }

        /*
        или так
         inputElem.checked = !inputElem.checked;
        */
        const id = taskElem.getAttribute("data-id");

        const taskFound = listTaskData.find((elem) => elem.id === Number(id));
        if (taskFound.comleted) {
            taskFound.comleted = false;
        } else {
            taskFound.comleted = true;
        }
        console.log(listTaskData);
    });
}