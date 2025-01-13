function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2D graphics
  var ctx = canvas.getContext('2d');

  // Set the canvas background to black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Attach event listener to the operation button
  const operationButton = document.getElementById('operation-btn');
  operationButton.addEventListener('click', () => handleDrawOperationEvent(ctx));
}

/**
 * Handles the operation event when the user clicks the operation button.
 */
function handleDrawOperationEvent(ctx) {
  // Clear the canvas
  ctx.clearRect(0, 0, 400, 400);

  // Reset the background to black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // Get vector v1 from input fields
  const x1 = parseFloat(document.getElementById('x1-coord').value);
  const y1 = parseFloat(document.getElementById('y1-coord').value);
  const z1 = parseFloat(document.getElementById('z1-coord').value);
  const v1 = new Vector3([x1, y1, z1]);
  drawVector2D(ctx, v1, "red");

  // Get vector v2 from input fields
  const x2 = parseFloat(document.getElementById('x2-coord').value);
  const y2 = parseFloat(document.getElementById('y2-coord').value);
  const z2 = parseFloat(document.getElementById('z2-coord').value);
  const v2 = new Vector3([x2, y2, z2]);
  drawVector2D(ctx, v2, "blue");

  // Get the operation and scalar
  const operation = document.getElementById('operation').value;
  const scalar = parseFloat(document.getElementById('scalar').value);

  // Perform operations
  if (operation === "add") {
    const v3 = new Vector3(v1.elements).add(v2);
    drawVector2D(ctx, v3, "green");
  } else if (operation === "sub") {
    const v3 = new Vector3(v1.elements).sub(v2);
    drawVector2D(ctx, v3, "green");
  } else if (operation === "mul") {
    const v3 = new Vector3(v1.elements).mul(scalar);
    const v4 = new Vector3(v2.elements).mul(scalar);
    drawVector2D(ctx, v3, "green");
    drawVector2D(ctx, v4, "green");
  } else if (operation === "div") {
    const v3 = new Vector3(v1.elements).div(scalar);
    const v4 = new Vector3(v2.elements).div(scalar);
    drawVector2D(ctx, v3, "green");
    drawVector2D(ctx, v4, "green");
  } else if (operation === "magnitude") {
    console.log(`Magnitude of v1: ${v1.magnitude()}`);
    console.log(`Magnitude of v2: ${v2.magnitude()}`);
  } else if (operation === "normalize") {
    const v1Normalized = new Vector3(v1.elements).normalize();
    const v2Normalized = new Vector3(v2.elements).normalize();
    drawVector2D(ctx, v1Normalized, "green");
    drawVector2D(ctx, v2Normalized, "green");
  } else if (operation === "angle") {
    const angle = angleBetween(v1, v2);
    console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
  } else if (operation === "area") {
    const area = areaTriangle(v1, v2);
    console.log(`Area of the triangle formed by v1 and v2: ${area.toFixed(2)}`);
  }
}

/**
 * Draws the 2D projection of a 3D vector on the canvas.
 */
function drawVector2D(ctx, v, color) {
  const scale = 20;
  const x = v.elements[0] * scale;
  const y = v.elements[1] * scale;

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(200, 200); // Start at the center of the canvas
  ctx.lineTo(200 + x, 200 - y); // Line to the scaled vector endpoint (invert y for canvas)
  ctx.stroke();
}

/**
 * Calculate the angle (in degrees) between two vectors.
 */
function angleBetween(v1, v2) {
  const dotProduct = Vector3.dot(v1, v2);
  const magnitude1 = v1.magnitude();
  const magnitude2 = v2.magnitude();

  if (magnitude1 === 0 || magnitude2 === 0) {
    console.log("Cannot calculate angle: one of the vectors has zero magnitude.");
    return NaN;
  }

  const cosTheta = dotProduct / (magnitude1 * magnitude2);
  const angleInRadians = Math.acos(Math.min(Math.max(cosTheta, -1), 1)); // Clamp value to avoid NaN
  return (angleInRadians * 180) / Math.PI; // Convert to degrees
}

/**
 * Calculate the area of the triangle formed by two vectors.
 */
function areaTriangle(v1, v2) {
  const crossProduct = Vector3.cross(v1, v2);
  const magnitude = crossProduct.magnitude();
  return magnitude / 2; // Area of triangle is half the area of parallelogram
}
