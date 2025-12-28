const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const box = 20; // حجم المربع الواحد
let score = 0;
let gameSpeed = 100;

// الثعبان هو عبارة عن مصفوفة من الإحداثيات
let snake = [{ x: 9 * box, y: 10 * box }];

// تحديد مكان الطعام عشوائياً
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let d; // الاتجاه

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // إذا أكل الثعبان الطعام
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById("score").innerHTML = "النقاط: " + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop(); // إزالة الذيل
    }

    let newHead = { x: snakeX, y: snakeY };

    // قواعد الخسارة (اصطدام بالجدار أو بنفسه)
    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("انتهت اللعبة! نقاطك: " + score);
    }

    snake.unshift(newHead); // إضافة رأس جديد
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function resetGame() {
    location.reload();
}

let game = setInterval(draw, gameSpeed);