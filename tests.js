function testGlobal() {
    for (let y = 0; y < 800; y++) {
        for (let x = 0; x < 800; x++) {
            const pos = {
                x: x,
                y: y,
            };
            const result = checkClick(pos);

            switch (result) {
                case "ring":
                    ctx.fillStyle = "#FF09";
                    break;
                case "triangle":
                    ctx.fillStyle = "#0FF9";
                    break;
                default:
                    ctx.fillStyle = "#0000";
                    break;
            }
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function testCircle() {
    for (let y = 0; y < 800; y++) {
        for (let x = 0; x < 800; x++) {
            const pos = {
                x: x,
                y: y,
            };

            if (checkRingClick(pos))
                ctx.fillStyle = "#0F09";
            else
                ctx.fillStyle = "#0000";
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

            if (checkTriangleClickVector(pos, true))
                ctx.fillStyle = "#0F09";
            else
                ctx.fillStyle = "#0000";
            ctx.fillRect(x, y, 1, 1);
        }
    }
}
