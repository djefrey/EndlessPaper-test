const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const result = document.getElementById("result");

const CENTER = {
    x: 400,
    y: 400,
};
const RADIUS = 300;
const RING_SIZE = 25;


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
    ctx.arc(CENTER.x, CENTER.y, RADIUS + RING_SIZE, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#FFF";

    ctx.beginPath();
    ctx.arc(CENTER.x, CENTER.y, RADIUS, 0, Math.PI * 2, true);
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
    ctx.moveTo(CENTER.x, CENTER.y - RADIUS);
    ctx.lineTo(CENTER.x + cos30, CENTER.y + sin30);
    ctx.lineTo(CENTER.x - cos30, CENTER.y + sin30);
    ctx.lineTo(CENTER.x, CENTER.y - RADIUS);
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
// Return 1 if the given position is inside the ring
// Calculate the distance between the center and the point
// Check if the distance is between the two circles radius
//
function checkRingClick(pos) {
    const diffX = CENTER.x - pos.x;
    const diffY = CENTER.y - pos.y;
    const dist = Math.sqrt(diffX * diffX + diffY * diffY);

    return (dist >= RADIUS && dist <= RADIUS + RING_SIZE);
}

//
// Return 1 if the given position is inside the triangle
// First, check if the X coordinate corresponds with the triangle base and if the click is not under the triangle
// The left and right edges are considered as linear function
// It calculates the a factor and b value ( f(x) = a * x + b )
// It calculates the linear function value using the X coordinate (= height)
// It checks if the Y coordinate is superior than the height (Y increase as we go "down")
//
function checkTriangleClick(pos) {
    const leftVertex = {
        x: CENTER.x - (Math.cos(Math.PI / 6) * RADIUS),
        y: CENTER.y + (Math.sin(Math.PI / 6) * RADIUS),
    };
    const topVertex = {
        x: CENTER.x,
        y: CENTER.y - RADIUS,
    };
    const rightVertex = {
        x: CENTER.x + (Math.cos(Math.PI / 6) * RADIUS),
        y: CENTER.y + (Math.sin(Math.PI / 6) * RADIUS),
    };

    if (pos.x >= CENTER.x - RADIUS && pos.x <= CENTER.y + RADIUS
    && pos.y <= leftVertex.y) {
        const values = pos.x <= CENTER.x
            ? calcLinearFctFactors(leftVertex, topVertex)
            : calcLinearFctFactors(topVertex, rightVertex);
        const height = values.a * pos.x + values.b;

        return (pos.y >= height);
    }
    return (0);
}

//
// Calculate and return linear function factors
// a = (y2 - y1) / (x2 - x1)
// b = y1 - a * y1
//
function calcLinearFctFactors(firstVertex, secondVertex)
{
    const a = (secondVertex.y - firstVertex.y) / (secondVertex.x - firstVertex.x);
    const b = firstVertex.y - a * firstVertex.x;

    return ({
        a: a,
        b: b,
    });
}