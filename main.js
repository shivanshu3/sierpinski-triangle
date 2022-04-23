let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let iterationSpan = document.getElementById('iteration');

function drawPoint(point) {
    let x = point[0];
    let y = point[1];
    ctx.fillRect(x - 1, y - 1, 2, 2);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

let triangleHeight = 433;
let triangleBase = 500;

let tTop = [canvas.width - triangleBase/2,  canvas.height - triangleHeight];
let tLeft = [0, canvas.height];
let tRight = [canvas.width, canvas.height];
let corners = [tTop, tLeft, tRight];

function pickRandomCorner() {
    let cornerIndex = getRandomInt(3);
    return corners[cornerIndex];
}

function getCenterPoint(point1, point2) {
    let x = (point1[0] + point2[0]) / 2;
    let y = (point1[1] + point2[1]) / 2;
    return [x, y];
}

drawPoint(tTop);
drawPoint(tLeft);
drawPoint(tRight);

// Seed
let pointToDraw = [getRandomInt(canvas.width), getRandomInt(canvas.height)];

let numInvocations = 5000;

(async () => {
    for (let i = 0; i < numInvocations; ++i) {
        drawPoint(pointToDraw);
        iterationSpan.textContent = i;

        let randomCorner = pickRandomCorner();
        pointToDraw = getCenterPoint(randomCorner, pointToDraw);

        await sleep(10);
    }
})();

