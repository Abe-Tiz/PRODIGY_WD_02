let timer; // Variable to hold the setInterval function
let running = false; // Variable to track if the stopwatch is running
let time = 0; // Variable to hold the elapsed time in milliseconds
let lapTimes = []; // Array to hold lap times

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateTime() {
  document.querySelector(".stopwatch").textContent = formatTime(time);
}

function startStop() {
  if (!running) {
    timer = setInterval(function () {
      time += 1000; // Increment time by 1 second (1000 milliseconds)
      updateTime();
    }, 1000);
    document.getElementById("startStopBtn").textContent = "Stop";
    running = true;
  } else {
    clearInterval(timer);
    document.getElementById("startStopBtn").textContent = "Start";
    running = false;
  }
}

function lapReset() {
  if (running) {
    lapTimes.push(time);
    let lapList = document.createElement("div");
    lapList.textContent = `Lap ${lapTimes.length}: ${formatTime(time)}`;
    document.body.appendChild(lapList);
  } else {
    clearInterval(timer);
    time = 0;
    lapTimes = [];
    updateTime();
    document.querySelectorAll("div").forEach((el) => {
      if (el.textContent.includes("Lap")) {
        el.remove();
      }
    });
    document.getElementById("startStopBtn").textContent = "Start";
  }
}

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("lapResetBtn").addEventListener("click", lapReset);
