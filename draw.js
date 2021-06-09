function drawCanvas() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, 800, 800);

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
    ctx.fillStyle = "#00F";

    ctx.beginPath();
    ctx.moveTo(LEFT_VERTEX.x, LEFT_VERTEX.y);
    ctx.lineTo(TOP_VERTEX.x, TOP_VERTEX.y);
    ctx.lineTo(RIGHT_VERTEX.x, RIGHT_VERTEX.y);
    ctx.lineTo(LEFT_VERTEX.x, LEFT_VERTEX.y);
    ctx.closePath();
    ctx.fill();
}