let dailyGoal = 120;

let currentMinutes = 0;
let pomodoros = 0;

let focusTime = 0;
let time = 25 * 60;

let timerRunning = false;

let interval;
let mode = "pomodoro";
let completedPomodoros = 0;

function startTimer()
{
    if(timerRunning)
        return;

    timerRunning = true;

    interval = setInterval(() =>
    {
        if(time > 0)
        {
            time--;

            updateTimer();
        }
        else
        {
            clearInterval(interval); 
            pomodoros++;
            
focusTime += 25;
currentMinutes += 25;

document.getElementById(
    "currentMinutes"
).innerText = currentMinutes;

updateProgress();


document.getElementById("pomodoroCount").innerText =
    pomodoros;

document.getElementById("focusTime").innerText =
    focusTime;
saveStats();
            alert("Pomodoro tamamlandı!");

            timerRunning = false;
        }

    },1000);
}

function updateTimer()
{
    let minutes =
        Math.floor(time / 60);

    let seconds =
        time % 60;

    document.getElementById("timer").innerText =
        `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}
function addTask()
{
    let time =
        document.getElementById("taskTime").value;

    let task =
        document.getElementById("taskInput").value;

    if(time === "" || task === "")
    {
        alert("Lütfen saat ve görev giriniz.");
        return;
    }

    let taskItem =
        document.createElement("div");

    taskItem.className = "task-item";

    taskItem.innerHTML =
    `
    <div class="task-left">

        <span class="task-time">
            ${time}
        </span>

        <span class="task-text">
            ${task}
        </span>

    </div>

    <button
        class="delete-btn"
        onclick="deleteTask(this)">
        ✖
    </button>
    `;

    document
        .getElementById("taskList")
        .appendChild(taskItem);

    document.getElementById("taskInput").value = "";
    document.getElementById("taskTime").value = "";

    saveTasks();
}
function saveTasks()
{
    localStorage.setItem(
        "tasks",
        document.getElementById("taskList").innerHTML
    );
}

window.onload = function()
{
    document.getElementById("taskList").innerHTML =
        localStorage.getItem("tasks") || "";

    updateTaskCount();

   
    pomodoros =
    Number(
        localStorage.getItem("pomodoros")
    ) || 0;

focusTime =
    Number(
        localStorage.getItem("focusTime")
    ) || 0;

currentMinutes =
    Number(
        localStorage.getItem("currentMinutes")
    ) || 0;

document.getElementById(
    "pomodoroCount"
).innerText = pomodoros;

document.getElementById(
    "focusTime"
).innerText = focusTime;

document.getElementById(
    "currentMinutes"
).innerText = currentMinutes;
updateProgress();
   
}
function resetTimer()
{
    clearInterval(interval);

    timerRunning = false;

    time = 25 * 60;

    updateTimer();
}

function deleteTask(button)
{
    button.parentElement.remove();

    saveTasks();

    updateTaskCount();
}
function updateTaskCount()
{
    let count =
        document.querySelectorAll("#taskList li").length;

    let taskCount =
        document.getElementById("taskCount");

    if(taskCount)
    {
        taskCount.innerText = count;
    }
}
function saveStats()
{
    localStorage.setItem(
        "pomodoros",
        pomodoros
    );

    localStorage.setItem(
        "focusTime",
        focusTime
    );

    localStorage.setItem(
        "currentMinutes",
        currentMinutes
    )
}
function pauseTimer()
{
    clearInterval(interval);

    timerRunning = false;
}
function setMode(newMode)
{
    clearInterval(interval);

    timerRunning = false;

    mode = newMode;

    if(newMode === "pomodoro")
    {
        time = 25 * 60;

        document.body.style.background =
            "#111827";
    }

    else if(newMode === "short")
    {
        time = 5 * 60;

        document.body.style.background =
            "#1F5E4A";
    }

    else
    {
        time = 15 * 60;

        document.body.style.background =
            "#463A75";
    }

    updateTimer();
}
function saveGoal()
{
    let goal =
        Number(
            document.getElementById("goalInput").value
        );

    if(goal < 1 || goal > 1440)
    {
        alert("Günlük hedef 1 ile 1440 dakika arasında olmalıdır.");

        return;
    }

    dailyGoal = goal;

    localStorage.setItem(
        "dailyGoal",
        dailyGoal
    );

    document.getElementById(
        "goalMinutes"
    ).innerText =
        dailyGoal;

    updateProgress();
}
function updateProgress()
{
    let percent =
        (currentMinutes / dailyGoal) * 100;

    if(percent > 100)
    {
        percent = 100;
    }

    document.getElementById(
        "progressBar"
    ).style.width =
        percent + "%";

    if(currentMinutes >= dailyGoal)
    {
        document.getElementById(
            "goalMessage"
        ).innerText =
        "🎉 Günlük hedef tamamlandı!";
    }
    else
    {
        document.getElementById(
            "goalMessage"
        ).innerText = "";
    }
}   