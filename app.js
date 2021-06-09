const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const result = document.getElementById("result");

const CENTER = {
    x: 400,
    y: 400,
};

const RADIUS = 300;
const RING_SIZE = 50;

const LEFT_VERTEX = {
    x: CENTER.x - (Math.cos(Math.PI / 6) * RADIUS) + 50 ,
    y: CENTER.y + (Math.sin(Math.PI / 6) * RADIUS) - 20,
};
const TOP_VERTEX = {
    x: CENTER.x,
    y: CENTER.y - RADIUS / 2,
};
const RIGHT_VERTEX = {
    x: CENTER.x + (Math.cos(Math.PI / 6) * RADIUS) + 80,
    y: CENTER.y + (Math.sin(Math.PI / 6) * RADIUS) + 25,
};

/* CLICK */

document.addEventListener("click", onClick);

function onClick(event) {
    const canvasBounds = canvas.getBoundingClientRect();
    const pos = {
        x: event.clientX - canvasBounds.x,
        y: event.clientY - canvasBounds.y,
    };

    if (checkRingClick(pos))
        result.innerHTML = "Ring " + getRingValue(pos);
    else if (checkTriangleClickVector(pos))
        result.innerHTML = "Triangle " + getTriangleValues(pos);
    else
        result.innerHTML = "None";
}

//
// Return TRUE if the given position is inside the ring
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
// Return the angle of the given position from 0 to 360
// NOTE: Y increase as it goes "down", so the value is inverted
//
function getRingValue(pos) {
    let angle = Math.atan2(pos.y - CENTER.y, pos.x - CENTER.x);

    if (angle < 0)
        angle = 2 * Math.PI + angle;
    return (Math.ceil(angle * 180 / Math.PI * 100) / 100);
}

//
// Return TRUE if the given position is inside the triangle
// First, check if the X coordinate corresponds with the triangle base and if the click is not under the triangle
// The left and right edges are considered as linear function
// It calculates the a factor and b value ( f(x) = a * x + b )
// It calculates the linear function value using the X coordinate (= height)
// It checks if the Y coordinate is superior than the height (Y increase as we go "down")
//
function checkTriangleClickLinear(pos) {
    if (pos.x >= LEFT_VERTEX.x && pos.x <= RIGHT_VERTEX.x
    && pos.y <= LEFT_VERTEX.y) {
        const values = pos.x <= TOP_VERTEX.x
            ? calcLinearFctFactors(LEFT_VERTEX, TOP_VERTEX)
            : calcLinearFctFactors(TOP_VERTEX, RIGHT_VERTEX);
        const height = values.a * pos.x + values.b;

        return (pos.y >= height);
    }
    return (false);
}

//
// Return TRUE if the given position is inside the triangle
// It calculates two vectors:
//  - Start -> End
//  - Start -> Pos
// It calculates the dot product to check if the position is on the left
// If the position is on the right, then the position is outside the triangle
//
function checkTriangleClickVector(pos) {
    const vertices = [LEFT_VERTEX, RIGHT_VERTEX, TOP_VERTEX];

    for (let i = 0; i < vertices.length; i++) {
        let start = vertices[i];
        let end;

        if (i == vertices.length - 1)
            end = vertices[0];
        else
            end = vertices[i + 1];

        let vertexVec = getVectorFromPoints(start, end);
        let pointVec = getVectorFromPoints(start, pos);

        let det = calcVectorDeterminant(vertexVec, pointVec);

        if (det > 0)
            return (false);
    }
    return (true);
}

//
// Return an array with the distance of the point from the opposites edges
// Order: LEFT - RIGHT - TOP
//
function getTriangleValues(pos) {
    const vertices = [LEFT_VERTEX, RIGHT_VERTEX, TOP_VERTEX];
    let results = [0, 0, 0];

    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];

        const oppositeStart = vertices[(i + 1) % vertices.length];
        const oppositeEnd = vertices[(i + 2) % vertices.length];
        const line = calcLinearFctFactors(oppositeStart, oppositeEnd);

        const dist = getDistancePointToLine(pos, line);
        const maxDist = getDistancePointToLine(vertex, line);
        results[i] = (Math.ceil(dist / maxDist * 100)) / 100;
    }
    return (results);
}

//
// Return the distance between a given point and a line
//
// (d) = a * x + b
// dist(A, (d)) = ABS(Ay - a * Ax - b) / SQRT(1 + a * a)
//
function getDistancePointToLine(pos, line) {
    const value = Math.abs(pos.y - pos.x * line.a - line.b) / Math.sqrt(1 + line.a * line.a);

    return (value);
}