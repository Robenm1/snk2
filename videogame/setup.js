const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let dom_replay = document.querySelector("#replay");
const scoreEl = document.querySelector("#scoreEl");
let restartButton = document.getElementById("resbtn")

let speed = 7;

let tileCount =  20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLegnth = 2;
let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 00;

//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    
    
    clearScreen();
    

    checkAppleCollision();
    drawApple();
    drawSnake();

    

    if(score > 2){
        speed = 11;
    }

    if(score > 5){
        speed = 15;
    }
    setTimeout(drawGame, 1000/ speed);
    restartButton.addEventListener("click", gameRestart);
}



function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    else if(headX == tileCount){
        gameOver = true
    }
    else if(headY < 0){
        gameOver = true
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true
            break;
        }
    }


    if(gameOver) {
        ctx1.fillStyle = "white";
        ctx1.font = "50px Verdana";


        ctx1.fillText("Game Over:P", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}



function clearScreen(){
    ctx1.fillStyle = 'black';
    ctx1.fillRect(0,0,canvas.width,canvas.height);

    
}

function drawSnake(){
    ctx1.fillStyle = 'orange';
    for(let i =0; i< snakeParts.length; i++){
        let part = snakeParts[i];
        ctx1.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new snakePart(headX, headY));
    while(snakeParts.length > tailLegnth){
        snakeParts.shift();
    }

    ctx1.fillStyle = 'green'
    ctx1.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize)
}



function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLegnth++;
        score ++;
        scoreEl.innerHTML = score
    }
     
    
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx1.fillStyle = "red";
    ctx1.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode ==40){
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }

     //right
     if(event.keyCode == 39){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }

}
function gameRestart() {
   drawGame()
   
}
drawGame();
