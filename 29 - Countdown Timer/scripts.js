let countdown; // to stop the countdown from running
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time');

function timer(seconds) {
    // clear any existing timers at start
    clearInterval(countdown);

    const now = Date.now(); // current time
    const then = now + seconds * 1000; // * 1000 because now is in milliseconds 
    displayTimeLeft(seconds); // display it immediately onece and then once again every single time - line 16
    displayEndTime(then);
    
    countdown = setInterval(() => {
       const secondsLeft = Math.round((then - Date.now()) / 1000); // then = when it stops
       // check if we should stop it
       if (secondsLeft <= 0) {
        clearInterval(countdown);
        return;
       }
       // display it
       displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; // adding 0 to display 04 etc
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour; // for the 12h clock
    const minutes = end.getMinutes();
    // endTime.textContent = `Be Back At ${hour}:${minutes}`; // european clock 24h
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60); // passing the mins to the timer
    this.reset();
});