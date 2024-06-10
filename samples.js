// Define a function to encapsulate your code
function initializeLoopingAudio() {
  // Get references to all audio elements with the class 'looping-audio'
  const audioElements = document.querySelectorAll('.looping-audio');

  // Loop through each audio element and add event listeners
  audioElements.forEach(audio => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
    });
  });
}

// Call the function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeLoopingAudio);

function generateSample() {
  // Get the selected category
  const category = document.getElementById('categorySelect').value;

  // Get all rows in the table body
  const rows = document.getElementById('sampleTableBody').rows;

  // Filter rows by the selected category
  const filteredRows = [];
  for (let row of rows) {
    var rowtext = row.cells[1].innerText.toLowerCase();
    if (rowtext === category) {
      filteredRows.push(row);
    }
  }

  // Pick a random row from the filtered rows
  if (filteredRows.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredRows.length);
    const selectedRow = filteredRows[randomIndex];

    const sampleName = selectedRow.cells[0].innerText;
    const sampleBPM = selectedRow.cells[2].innerText;
    const sampleLength = selectedRow.cells[3].innerText;
    const audioElement = selectedRow.cells[4].innerHTML;

    document.getElementById('selectedSample').innerHTML = `Selected Sample: ${sampleName}, BPM: ${sampleBPM}, Length: ${sampleLength} bars<br>${audioElement}`;
    } else {
      document.getElementById('selectedSample').innerText = 'No samples found for the selected category.';
    }
}