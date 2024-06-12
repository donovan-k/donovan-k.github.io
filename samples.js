

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

    document.getElementById('selectedSample').innerHTML = `${sampleName} | BPM: ${sampleBPM} | Length: ${sampleLength} bars<div>${audioElement}</div>`;
    } else {
      document.getElementById('selectedSample').innerText = 'No samples found for the selected category.';
    }
}
