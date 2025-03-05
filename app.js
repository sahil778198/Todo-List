let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();  // Use value instead of ariaValueMax

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");  // Use querySelector for class
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" alt="Edit" onclick="editTask(${index})" />
                    <img src="./img/bin.png" alt="Delete" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    updateProgress();
};

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        updateTasksList();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    const progressPercentage = (totalTasks > 0) ? (completedTasks / totalTasks) * 100 : 0;

    progress.style.width = `${progressPercentage}%`;
    numbers.innerText = `${completedTasks} / ${totalTasks}`;
};

document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});
