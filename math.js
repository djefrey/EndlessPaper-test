//
// Calculate and return linear function factors
// a = (y2 - y1) / (x2 - x1)
// b = y1 - a * y1
//
function calcLinearFctFactors(point1, point2)
{
    const a = (point2.y - point1.y) / (point2.x - point1.x);
    const b = point1.y - a * point1.x;

    return ({
        a: a,
        b: b,
    });
}

//
// Return the vector of the two points
//
function getVectorFromPoints(start, end) {
    const vector = {
        x: end.x - start.x,
        y: end.y - start.y,
    };

    return (vector);
}

//
// Return the determinant of the two vectors
//
function calcVectorDeterminant(vec1, vec2) {
    const det = vec1.x * vec2.y - vec1.y * vec2.x;

    return (det);
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

//
// Return the distance between a given point and a segment
//
function getDistancePointToSegment(pos, start, end) {
    const vertexVec = getVectorFromPoints(start, end);
    const posVec = getVectorFromPoints(start, pos);

    let projection = dotProduct(posVec, vertexVec) / getVectorNormSquare(vertexVec);
    projection = Math.max(0, Math.min(projection, 1));

    const closestPoint = {
        x: start.x + vertexVec.x * projection,
        y: start.y + vertexVec.y * projection,
    };

    return (getDistance(closestPoint, pos));
}

//
// Return the normalization of the given vector
//
function getVectorNormalized(vector) {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    return ({
        x: vector.x / length,
        y: vector.y / length,
    });
}

//
// Return the center of the triangle
//
function getTriangleCenter(vertices) {
    let sumX = 0;
    let sumY = 0;

    for (let i = 0; i < vertices.length; i++) {
        sumX += vertices[i].x;
        sumY += vertices[i].y;
    }
    return ({
        x: sumX / 3,
        y: sumY / 3,
    });
}

//
// Return the intersection point of the two lines
//
// f(x) = a * x + b
// g(x) = c * x + d
//
// x = (d - b) / (a - c)
// y = a * x + b
//
function getIntersectionPoint(line1, line2) {
    const x = (line2.b - line1.b) / (line1.a - line2.a);
    const y = line1.a * x + line1.b;

    return ({
        x: x,
        y: y,
    });
}

//
// Return the perpendical vector clockwise
//
function getPerpendicularVectorClockwise(vector) {
    return ({
        x: -vector.y,
        y: vector.x,
    });
}

//
// Return the perpendical vector counter clockwise
//
function getPerpendicularVectorCounterClockwise(vector) {
    return ({
        x: vector.y,
        y: -vector.x,
    });
}

function dotProduct(vec1, vec2) {
    return (vec1.x * vec2.x + vec1.y * vec2.y);
}

function getVectorNorm(vector) {
    return (Math.sqrt(vector.x * vector.x + vector.y * vector.y));
}

function getVectorNormSquare(vector) {
    return (vector.x * vector.x + vector.y * vector.y);
}

function getDistance(point1, point2) {
    const diffX = point2.x - point1.x;
    const diffY = point2.y - point1.y;

    return (Math.sqrt(diffX * diffX + diffY * diffY));
}