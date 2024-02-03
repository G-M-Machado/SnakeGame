let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

document.addEventListener('keydown', update);
let game = setInterval(startGame, 100)

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
};

function createFood() {
    context.fillStyle ="red"
    context.fillRect(food.x, food.y, box, box)
};

function createBG(){
context.fillStyle = "white"
context.fillRect(0,0,16 * box, 16 * box)
};

function createSnake() {
    snake.forEach(segmento => {
        context.fillStyle = "green"
        context.fillRect(segmento.x, segmento.y, box, box)
    })
};

function update(event) {
    if (event.keyCode === 37 && direction !== 'right') direction = 'left';
    if (event.keyCode === 38 && direction !== 'down') direction = 'up';
    if (event.keyCode === 39 && direction !== 'left') direction = 'right';
    if (event.keyCode === 40 && direction !== 'up') direction = 'down';
};

function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    gameOver();
    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        score += 25;
        document.getElementById('Pontos').innerText = score;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let score = 0;

function gameOver() {
    const head = snake[0];
    const body = snake.slice(1);
    if (body.some(part => part.x === head.x && part.y === head.y)) {
        clearInterval(game);
        let restart = confirm('Game Over. Deseja reiniciar o jogo?');
        if (restart) {
            snake = [{x: 8 * box, y: 8 * box}];
            direction = "right";
            food = {
                x: Math.floor(Math.random() * 15 + 1) * box, 
                y: Math.floor(Math.random() * 15 + 1) * box
            };
            game = setInterval(startGame, 100);
        }
    }
}








