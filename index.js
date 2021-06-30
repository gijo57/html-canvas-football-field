const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const corners = {
  topLeft: { x: width / 14, y: 30 },
  topRight: { x: width - width / 14, y: 30 },
  bottomLeft: { x: width / 14, y: height - 30 },
  bottomRight: { x: width - width / 14, y: height - 30 }
};

// Make cool grass for field
for (let i = 0; i < 14; i++) {
  if (i % 2 === 0) {
    context.fillStyle = 'green';
  } else {
    context.fillStyle = 'darkgreen';
  }
  context.fillRect((i * width) / 14, 0, width / 14, height);
}

// Determine generic line styles for field
context.strokeStyle = 'white';
context.fillStyle = 'white';
context.lineWidth = 3;

//Draw field borders & center line
const fieldWidth = width - 2 * (width / 14);
const fieldHeight = height - 2 * 30;

context.strokeRect(
  corners.topLeft.x,
  corners.topLeft.y,
  fieldWidth,
  fieldHeight
);

context.beginPath();
context.moveTo(width / 2, corners.topLeft.y);
context.lineTo(width / 2, corners.bottomLeft.y);
context.stroke();
context.closePath();

// Function for drawing all round shapes of the field
const drawArc = (x, y, radius, start, end, type) => {
  context.beginPath();
  context.arc(x, y, radius, start, end);
  if (type === 'fill') {
    context.fill();
  } else if (type === 'no-fill') {
    context.stroke();
  }
};

//Function for drawing all box areas
const drawArea = (boxWidth, boxHeight, fieldHalf) => {
  const yCoordinate = height / 2 - boxHeight / 2;
  if (fieldHalf === 'left') {
    context.strokeRect(corners.topLeft.x, yCoordinate, boxWidth, boxHeight);
    drawArc((width / 14) * 2 + 10, height / 2, 5, 0, 2 * Math.PI, 'fill');
  } else if (fieldHalf === 'right') {
    context.strokeRect(
      corners.topRight.x - boxWidth,
      yCoordinate,
      boxWidth,
      boxHeight
    );
    drawArc(
      width - (width / 14) * 2 - 10,
      height / 2,
      5,
      0,
      2 * Math.PI,
      'fill'
    );
  }
};

//Field borders
drawArea(width - 2 * (width / 14), height - 2 * 30);

//Center spot
drawArc(width / 2, height / 2, 5, 0, 2 * Math.PI, 'fill');

//Center circle
drawArc(width / 2, height / 2, 60, 0, 2 * Math.PI, 'no-fill');

//Penalty areas
drawArea((width / 14) * 2 - 10, (height / 5) * 2, 'left');
drawArea((width / 14) * 2 - 10, (height / 5) * 2, 'right');

//Goal areas
drawArea(width / 14 - 20, height / 5, 'left');
drawArea(width / 14 - 20, height / 5, 'right');

//Draw corners
drawArc(corners.topLeft.x, corners.topLeft.y, 20, 0, 0.5 * Math.PI, 'no-fill');
drawArc(
  corners.bottomLeft.x,
  corners.bottomLeft.y,
  20,
  -0.5 * Math.PI,
  0,
  'no-fill'
);
drawArc(
  corners.topRight.x,
  corners.topRight.y,
  20,
  0.5 * Math.PI,
  Math.PI,
  'no-fill'
);
drawArc(
  corners.bottomRight.x,
  corners.bottomRight.y,
  20,
  Math.PI,
  1.5 * Math.PI,
  'no-fill'
);
