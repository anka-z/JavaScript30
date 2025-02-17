/* Get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* Build functions */

 function togglePlay() {
    //if (video.paused) {
    //    video.play();
    //} else {
    //    video.pause();
    //}
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
//ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

ranges.forEach(range => {
    range.addEventListener('mousedown', () => {
        isRangeClicked = true;
    });
    range.addEventListener('mouseup', () => {
        isRangeClicked = false;
    });
    range.addEventListener('mousemove', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
//progress.addEventListener('mousemove', () => {
//    if (mousedown) {
//        scrub();
//    }
//});
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // if mousedown is true then scrub runs
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', () => { video.requestFullscreen() });
fullscreen.addEventListener('click', () => { video.exitFullscreen() });

