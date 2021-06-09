function testCircle() {
    for (let y = 0; y < 800; y++) {
        for (let x = 0; x < 800; x++) {
            const pos = {
                x: x,
                y: y,
            };

            if (checkRingClick(pos))
                ctx.fillStyle = "#0F0";
            else
                ctx.fillStyle = "#FFF";
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function testTriangle() {
    for (let y = 0; y < 800; y++) {
        for (let x = 0; x < 800; x++) {
            const pos = {
                x: x,
                y: y,
            };

            if (checkTriangleClickVector(pos))
                ctx.fillStyle = "#0F0";
            else
                ctx.fillStyle = "#FFF";
            ctx.fillRect(x, y, 1, 1);
        }
    }
}
