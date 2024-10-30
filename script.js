
const loadingScreen = document.getElementById("loadingScreen");
const stopwatchContainer = document.getElementById("stopwatchContainer");
const displayClock = document.getElementById("displayClock");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");
const lapContainer = document.getElementById("lapContainer"); // Select the lap container

let timerInterval;
let elapsedTime = 0;
let running = false;
let lapCount = 1;

// Format time helper function
function formatTime(ms) {
	let hours = Math.floor(ms / 3600000);
	let minutes = Math.floor((ms % 3600000) / 60000);
	let seconds = Math.floor((ms % 60000) / 1000);
	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	seconds = seconds < 10 ? `0${seconds}` : seconds;

	return `${hours}:${minutes}:${seconds}`;
}
function updateDisplay() {
	displayClock.textContent = formatTime(elapsedTime);
}

// Show stopwatch container after loading
window.onload = () => {
	setTimeout(() => {
		loadingScreen.style.opacity = 0;
		setTimeout(() => {
			loadingScreen.classList.add("hidden");
			stopwatchContainer.classList.remove("hidden");
		}, 500);
	}, 2000);
};

// Start the stopwatch
startBtn.addEventListener("click", () => {
	if (!running) {
		timerInterval = setInterval(() => {
			elapsedTime += 1000;
			updateDisplay();
		}, 1000);
		running = true;
		startBtn.classList.add("hidden");
		pauseBtn.classList.remove("hidden");
		resetBtn.classList.remove("hidden");
		lapBtn.classList.remove("hidden");
	}
});
pauseBtn.addEventListener("click", () => {
	if (running) {
		clearInterval(timerInterval);
		running = false;
		pauseBtn.classList.add("hidden");
		startBtn.classList.remove("hidden");
	}
});
resetBtn.addEventListener("click", () => {
	clearInterval(timerInterval);
	elapsedTime = 0;
	running = false;
	updateDisplay();
	resetBtn.classList.add("hidden");
	lapBtn.classList.add("hidden");
	pauseBtn.classList.add("hidden");
	startBtn.classList.remove("hidden");
	lapsList.innerHTML = ""; // Clear laps
	lapCount = 1;
});
lapBtn.addEventListener("click", () => {
	const lapTime = formatTime(elapsedTime);
	const lapItem = document.createElement("li");
	lapItem.className = "bg-gray-800 text-white p-2 rounded-lg shadow-md";
	lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;

	lapsList.appendChild(lapItem);
	lapsList.scrollTop = lapsList.scrollHeight;
	if (!lapContainer.classList.contains("expanded")) {
		lapContainer.classList.add("expanded");
	}
});
