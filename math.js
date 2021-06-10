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
    const dot = vec1.x * vec2.y - vec1.y * vec2.x;

    return (dot);
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
// Return the perpendical vector
//
function getPerpendicularVector(vector) {
    return ({
        x: vector.y,
        y: -vector.x,
    });
}

function dotProduct(vec1, vec2) {
    return (vec1.x * vec2.x + vec1.y * vec2.y);
}

function getDistance(point1, point2) {
    const diffX = point2.x - point1.x;
    const diffY = point2.y - point1.y;

    return (Math.sqrt(diffX * diffX + diffY * diffY));
}