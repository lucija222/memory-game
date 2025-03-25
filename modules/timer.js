let startTime = null;
let elapsedTime = 0;
let isTimerRunning = false;
let animationFrameId = null;
const timer = document.querySelector("#timer");
const memoryGrid = document.querySelector("#memory-grid");

const startTimer = () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTime = Date.now();
        updateTimer();
    }
};

const stopTimer = () => {
    if (isTimerRunning) {
        isTimerRunning = false;
        cancelAnimationFrame(animationFrameId);
    }
};

const resetTimer = () => {
    if (isTimerRunning) {
        stopTimer();
    }

    timer.textContent = "00:00";
    elapsedTime = 0;
    addStartTimerListener();
};

const updateTimer = () => {
    if (isTimerRunning) {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        const formattedTime = `${minutes}:${seconds}`;
        timer.textContent = formattedTime;
        animationFrameId = requestAnimationFrame(updateTimer);
    }
};

const addStartTimerListener = () => {
    memoryGrid.addEventListener("click", startTimer, {once: true});
};

export { stopTimer, resetTimer, addStartTimerListener };