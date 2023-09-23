// beat.js

document.addEventListener("DOMContentLoaded", function () {
// Initialize variables
let currentAudioIndex = 0;
let playlistQueue = [];
const maxQueueSize = 5;
const audioElements = document.querySelectorAll("audio");
const playButtons = document.querySelectorAll(".play-btn");
const stopButton  = document.getElementById("stop-btn");
const shuffleButton = document.getElementById("shuffle-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

// Function to play audio
function playAudio(index) {
  audioElements[index].play();
}

// Function to pause audio
function pauseAudio(index) {
  audioElements[index].pause();
}

// Function to load and play the next audio in the queue
function playNextInQueue() {
  if (playlistQueue.length > 0) {
    const nextIndex = playlistQueue.shift();
    pauseAudio(currentAudioIndex);
    currentAudioIndex = nextIndex;
    audioElements[currentAudioIndex].load();
    audioElements[currentAudioIndex].addEventListener("loadeddata", () => {
      playAudio(currentAudioIndex);
    });
  }
}

// Event listeners for play buttons
playButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (audioElements[index].paused) {
      pauseAudio(currentAudioIndex);
      currentAudioIndex = index;
      playAudio(currentAudioIndex);
    } else {
      pauseAudio(currentAudioIndex);
    }
  });
});

// Event listener for stop button
stopButton.addEventListener("click", () => {
  pauseAudio(currentAudioIndex);
});

// Event listener for shuffle button
shuffleButton.addEventListener("click", () => {
  const indexes = Array.from(Array(audioElements.length).keys());
  indexes.splice(currentAudioIndex, 1);
  shuffleArray(indexes);
  playlistQueue = indexes.slice(0, maxQueueSize);
  playNextInQueue();
});

// Event listener for previous button
prevButton.addEventListener("click", () => {
  const newIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
  pauseAudio(currentAudioIndex);
  currentAudioIndex = newIndex;
  playAudio(currentAudioIndex);
});

// Event listener for next button
nextButton.addEventListener("click", () => {
  const newIndex = (currentAudioIndex + 1) % audioElements.length;
  pauseAudio(currentAudioIndex);
  currentAudioIndex = newIndex;
  playAudio(currentAudioIndex);
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
});
