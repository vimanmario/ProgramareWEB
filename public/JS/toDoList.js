function allowDrop(event) {
    event.preventDefault();
    console.log("allowDrop event triggered");
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    console.log("drag event triggered");
}

function drop(event, targetColumn) {
    event.preventDefault();
    console.log("drop event triggered. Target column:", targetColumn);
    var data = event.dataTransfer.getData("text/plain");
    var draggedItem = document.getElementById(data);
    var targetList = document.getElementById(targetColumn + "List");

    // Remove task from source list if it's not the same as the target list
    var sourceColumn = draggedItem.closest(".todo-column").id;
    var sourceList = document.getElementById(sourceColumn + "List");
    if (sourceColumn !== targetColumn && sourceList.contains(draggedItem)) {
        draggedItem.parentNode.removeChild(draggedItem);
        console.log("Task removed from", sourceColumn, "column");
    }

    // Append task to target list
    targetList.appendChild(draggedItem);
    console.log("Task moved to", targetColumn, "column");

    // Actualizează lista de task-uri în coloana sursă și în coloana țintă
    updateTaskList(sourceColumn);
    updateTaskList(targetColumn);
    updateOtherColumns(data, sourceColumn);
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    var newTask = document.createElement("li");
    newTask.textContent = taskText;
    newTask.setAttribute("draggable", "true");
    newTask.setAttribute("id", "task" + Date.now()); // Unique ID for each task
    newTask.addEventListener("dragstart", drag); // Add drag event listener here

    // Adăugăm evenimentul de clic pentru fiecare task
    newTask.addEventListener("click", function(event) {
        // Deselectăm toate task-urile din lista
        var allTasks = document.querySelectorAll(".todo-list li");
        allTasks.forEach(function(t) {
            t.classList.remove("selected");
        });

        // Selectăm task-ul clicat și adăugăm clasa `.selected`
        event.target.classList.add("selected");
    });

    // Add the task to the assigned column only
    document.getElementById("assignedList").appendChild(newTask);

    taskInput.value = "";
}

// Funcția pentru actualizarea listelor în celelalte coloane
function updateOtherColumns(taskId, sourceColumn) {
    var columns = ['assigned', 'pending', 'finished'];
    columns.forEach(function(column) {
        if (column !== sourceColumn) {
            var targetList = document.getElementById(column + "List");
            var existingTask = targetList.querySelector("#" + taskId);
            if (!existingTask) {
                var taskClone = document.getElementById(taskId).cloneNode(true);
                targetList.appendChild(taskClone);
            }
        }
    });
}

function moveNext(currentColumn) {
    var currentList = document.getElementById(currentColumn + "List");
    var nextColumn = getNextColumn(currentColumn);
    var nextList = document.getElementById(nextColumn + "List");

    // Verificăm dacă există vreun task selectat în coloana curentă
    var selectedTask = currentList.querySelector(".selected");
    if (selectedTask) {
        // Mutăm task-ul selectat în coloana următoare
        currentList.removeChild(selectedTask);
        nextList.appendChild(selectedTask);

        // Anulăm selecția task-ului după mutare
        selectedTask.classList.remove("selected");

        // Actualizăm listele de task-uri în coloane
        updateTaskList(currentColumn);
        updateTaskList(nextColumn);
        updateOtherColumns(selectedTask.id, currentColumn);
    }
}

// Adăugăm evenimentul de click pentru butoanele "Next"
var nextButtons = document.querySelectorAll(".next-button");
nextButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        var currentColumn = event.target.closest(".todo-column").id;
        moveNext(currentColumn);
    });
});

function getNextColumn(currentColumn) {
    switch (currentColumn) {
        case "assigned":
            return "pending";
        case "pending":
            return "finished";
        default:
            return null; // Nu există următoarea coloană pentru "finished"
    }
}

var todoLists = document.querySelectorAll(".todo-list");
todoLists.forEach(function(list) {
    list.addEventListener("drop", function(event) {
        event.preventDefault();
        var targetColumn = event.target.closest(".todo-column").id;
        drop(event, targetColumn);
    });
    list.addEventListener("dragover", allowDrop);
});
