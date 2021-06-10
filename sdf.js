//
// Signed Distance Field
// Ring Shape
//
function sdfRing(pos, center, radius, size) {
    const dist = getDistance(center, pos);

    if (dist < (radius + size / 2))
        return (radius - dist);
    else
        return (dist - (radius + size));
}

//
// Signed Distance Field
// Triangle Shape
//
function sdfTriangle(pos, vertices) {
    let smallestDist = 1000000000;
    let inside = true;

    for (let i = 0; i < vertices.length; i++) {
        const start = vertices[i];
        const end = (i < vertices.length - 1) ? vertices[i + 1] : vertices[0];
        const dist = getDistancePointToSegment(pos, start, end);

        if (dist < smallestDist)
            smallestDist = dist;

        if (!inside)
            continue;

        const vertexVec = getVectorFromPoints(start, end);
        const posVec = getVectorFromPoints(start, pos);
        const det = calcVectorDeterminant(vertexVec, posVec);

        if (det > 0)
            inside = false;
    }
    return (inside ? -smallestDist : smallestDist);
}