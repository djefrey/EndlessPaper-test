const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const result = document.getElementById("result");

const RADIUS = 300;

/* DRAW */

function drawCanvas() {
    drawRing();
    drawTriangle();
}

//
// Draw a ring with two circles
//
function drawRing() {
    ctx.fillStyle = "#F00";

    ctx.beginPath();
    ctx.arc(400, 400, RADIUS + 25, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#FFF";

    ctx.beginPath();
    ctx.arc(400, 400, RADIUS, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

//
// Draw a triangle in the ring
//
function drawTriangle() {
    const cos30 = Math.cos(Math.PI / 6) * RADIUS;
    const sin30 = Math.sin(Math.PI / 6) * RADIUS;

    ctx.fillStyle = "#00F";

    ctx.beginPath();
    ctx.moveTo(400, 400 - RADIUS);
    ctx.lineTo(400 + cos30, 400 + sin30);
    ctx.lineTo(400 - cos30, 400 + sin30);
    console.log(400 - cos30, 400 + sin30);
    ctx.lineTo(400, 400 - RADIUS);
    ctx.closePath();
    ctx.fill();
}

/* CLICK */

document.addEventListener("click", onClick);

function onClick(event) {
    const pos = {
        x: event.pageX,
        y: event.pageY,
    };

    if (checkRingClick(pos))
        result.innerHTML = "Ring";
    else if (checkTriangleClick(pos))
        result.innerHTML = "Triangle";
    else
        result.innerHTML = "None";
}

//
// Calculate the distance between the center and the point
// Check if the distance is between the two circles radius
//
function checkRingClick(pos) {
    const diffX = 400 - pos.x;
    const diffY = 400 - pos.y;
    const dist = Math.sqrt(diffX * diffX + diffY * diffY);

    return (dist >= RADIUS && dist <= RADIUS + 25);
}

//
// First, check if the X coordinate correspond to the triangle base and if the click is not under the triangle
// Then, the left edge of the triangle is considered as an affine function
// It calculates the a factor and b value ( f(x) = a * x + b )
// It calculates the affine function value using the X coordinate (= height)
// It checks if the Y coordinate is superior than the height (Y increase as we go "down")
//
function checkTriangleClick(pos) {
    const leftEdgeStart = {
        x: 400 - (Math.cos(Math.PI / 6) * RADIUS),
        y: 400 + (Math.sin(Math.PI / 6) * RADIUS),
    };
    const leftEdgeEnd = {
        x: 400,
        y: 400 - RADIUS,
    };

    if (pos.x >= 400 - RADIUS && pos.x <= 400 + RADIUS
    && pos.y <= leftEdgeStart.y) {
        const aFactor = (leftEdgeEnd.y - leftEdgeStart.y) / (leftEdgeEnd.x - leftEdgeStart.x);
        const bValue = leftEdgeEnd.y - aFactor * leftEdgeEnd.x;

        const height = bValue + aFactor * (pos.x <= 400
            ? pos.x
            : 800 - pos.x);

        return (pos.y >= height);
    }
    return (0);
}