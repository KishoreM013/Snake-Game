const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 29;
const rows = canvas.height / boxSize;
const columns = canvas.width / boxSize;

let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let food = { x: Math.floor(Math.random() * columns) * boxSize, y: Math.floor(Math.random() * rows) * boxSize };
let direction = 'RIGHT';
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function gameLoop() {
    const head = { ...snake[0] };

    // Move snake in the current direction
    if (direction === 'UP') head.y -= boxSize;
    if (direction === 'DOWN') head.y += boxSize;
    if (direction === 'LEFT') head.x -= boxSize;
    if (direction === 'RIGHT') head.x += boxSize;

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * columns) * boxSize, y: Math.floor(Math.random() * rows) * boxSize };
    } else {
        snake.pop(); // Remove the last part of the snake if it doesn't eat
    }

    // Add new head
    snake.unshift(head);

    // Game over conditions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

function isCollision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

const gameInterval = setInterval(gameLoop, 100);
