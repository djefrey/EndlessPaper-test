const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resultText = document.getElementById("result");

const CENTER = {
    x: 400,
    y: 400,
};

const RADIUS = 300;
const RING_SIZE = 50;

const LEFT_VERTEX = {
    x: CENTER.x - (Math.cos(Math.PI / 6) * RADIUS) + 50,
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

const CLICK_TOLERENCE = 15;

/* CLICK */

document.addEventListener("click", onClick);

function onClick(event) {
    const canvasBounds = canvas.getBoundingClientRect();
    const pos = {
        x: event.clientX - canvasBounds.x,
        y: event.clientY - canvasBounds.y,
    };
    const result = checkClick(pos);

    switch (result) {
        case "ring":
            resultText.innerHTML = "Ring " + getRingValue(pos);
            break;
        case "triangle":
            const trianglePos = getTriangleClickPos(pos);

            console.log(pos, trianglePos);

            resultText.innerHTML = "Triangle " + getTriangleValues(trianglePos);
            break;
        default:
            resultText.innerHTML = "None";
            break;
    }
}

//
// Check if the position is inside the ring or the triangle
// Return the return
//
function checkClick(pos) {
    if (checkTriangleClickVector(pos, true))
        return ("triangle");
    else if (checkRingClick(pos))
        return ("ring");
    else
        return ("none");
}

//
// Return TRUE if the given position is inside the ring
// Calculate the distance between the center and the point
// Check if the distance is between the two circles radius
//
function checkRingClick(pos) {
    const dist = getDistance(pos, CENTER);

    return (dist >= RADIUS - CLICK_TOLERENCE && dist <= RADIUS + RING_SIZE + CLICK_TOLERENCE);
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
function checkTriangleClickVector(pos, enableTolerence) {
    let vertices = [LEFT_VERTEX, RIGHT_VERTEX, TOP_VERTEX];

    if (enableTolerence)
        vertices = getVerticesWithTolerence(vertices);

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
// Apply the tolerence to the vertices
// Return an array with the vertices
//
function getVerticesWithTolerence(vertices)
{
    let results = [];

    for (let i = 0; i < vertices.length; i++) {
        const before = (i > 0) ? vertices[i - 1] : vertices[vertices.length - 1];
        const after = (i < vertices.length - 1) ? vertices[i + 1] : vertices[0];

        const bfVec = getVectorFromPoints(before, vertices[i]);
        const afVec = getVectorFromPoints(after, vertices[i]);
        const bfNorm = getVectorNormalized(bfVec);
        const afNorm = getVectorNormalized(afVec);

        results[i] = {
            x: vertices[i].x + (bfNorm.x + afNorm.x) * CLICK_TOLERENCE,
            y: vertices[i].y + (bfNorm.y + afNorm.y) * CLICK_TOLERENCE,
        };
    }
    return (results);
}

//
// Return the pos inside the triangle without the tolerence
// It finds the closest edge of the triangle and find the intersection point of the edge with the center of triangle -> pos
//
function getTriangleClickPos(pos) {
    const vertices = [LEFT_VERTEX, RIGHT_VERTEX, TOP_VERTEX];
    const triangleCenter = getTriangleCenter(vertices);
    const posLine = calcLinearFctFactors(triangleCenter, pos);

    let smallestDist = 1000000000;
    let newPos = null;

    if (checkTriangleClickVector(pos, false))
        return (pos);

    for (let i = 0; i < vertices.length; i++) {
        const start = vertices[i];
        const end = (i < vertices.length - 1) ? vertices[i + 1] : vertices[0];
        const line = calcLinearFctFactors(start, end);
        const pointDist = getDistancePointToLine(pos, line);

        if (pointDist < smallestDist) {
            smallestDist = pointDist;
            newPos = getIntersectionPoint(line, posLine);
        }
    }
    return (newPos);
}
