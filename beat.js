function generateScribble(canvas, canvasContainer) {
  const context = canvas.getContext('2d');

  // Set the canvas dimensions to match its container
  canvas.width = canvasContainer.offsetWidth;
  canvas.height = canvasContainer.offsetHeight;

  // Generate a random path with random colors
  function generateScribblePath() {
    const points = [];
    const numPoints = 30;
    const minDistance = 10;
    const maxDistance = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Generate random points
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (maxDistance - minDistance) + minDistance;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      points.push({x, y});
    }

    // Connect the points with a path
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < numPoints; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const midPoint = {
        x: (prevPoint.x + currentPoint.x) / 2,
        y: (prevPoint.y + currentPoint.y) / 2
      };
      context.quadraticCurveTo(prevPoint.x, prevPoint.y, midPoint.x, midPoint.y);
    }
    context.quadraticCurveTo(points[numPoints - 1].x, points[numPoints - 1].y, points[0].x, points[0].y);

    // Set a random color for the path
    context.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke();
  }

  // Generate the initial scribble
  generateScribblePath();
  //setInterval(generateScribblePath, 1000);
}

for (var i = 1; i <= 3; i++) {
  var index = i.toString();
  const c = document.getElementById('canvas'+index);
  const cc = document.getElementById('canvas-container'+index);
  generateScribble(c, cc);
}