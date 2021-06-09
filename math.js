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