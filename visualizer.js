// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an analyser node
const analyserMap = new Map();

// Function to create a visualizer for an audio element
function createVisualizer(audioElement, canvasElement) {
  // Get the canvas context
  const canvasContext = canvasElement.getContext('2d');

  // Create an analyser node for this audio element
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;

  // Connect the audio element to the analyser node
  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  source.connect(audioContext.destination);

  // Store the analyser in the map for later reference
  analyserMap.set(audioElement, analyser);

  // Render the visualizer for this audio element
  function renderVisualizer() {
    // Clear the canvas
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Get the frequency data
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Set up the canvas properties
    const barWidth = canvasElement.width / bufferLength;
    let x = 0;

    // Render each bar
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvasElement.height;

      // Set the fill style and draw the bar
      canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      canvasContext.fillRect(x, canvasElement.height - barHeight / 2, barWidth, barHeight / 2);

      // Move to the next position
      x += barWidth + 1;
    }

    // Call the next frame
    requestAnimationFrame(renderVisualizer);
  }

  // Start rendering the visualizer
  renderVisualizer();
}

// Function to open a new window with the visualizer
function openVisualizerWindow(audioElement) {
  // Create a new window
  const visualizerWindow = window.open('', '_blank', 'width=400,height=300');

  // Create a canvas element in the new window
  const canvasElement = visualizerWindow.document.createElement('canvas');
  visualizerWindow.document.body.appendChild(canvasElement);

  // Call the visualizer creation function for the audio element and canvas
  createVisualizer(audioElement, canvasElement);
}

// Get all the audio elements
const audioElements = document.querySelectorAll('audio');

// Attach click event listeners to each audio element
audioElements.forEach((audioElement) => {
  audioElement.addEventListener('click', () => {
    openVisualizerWindow(audioElement);
  });
});