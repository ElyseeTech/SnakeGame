//board
var blockSize = 25;
var rows = 16;
var cols= 16;
var board;
var context;

//drawing the snake head
var snakeX = blockSize *5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY =0;

//snake body
 var snakeBody=[];
//food
 var foodX;
 var foodY;

 //game over code
 var gameOver = false;

//drawing the board
window.onload =function(){
    board= document.getElementById("board");
    board.height =rows * blockSize;
    board.width =cols * blockSize;
    context = board.getContext("2d");// drawing the board

// calling the below functions 
    placeFood()
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //100 millseconds

}
function update(){

    if (gameOver){
        return;
    }

  context.fillStyle = " green";
  context.fillRect(0, 0, board.width, board.height);  

  //food size
  context.fillStyle= "yellow";
  context.fillRect(foodX,foodY, blockSize,blockSize);
  if (snakeX== foodX && snakeY == foodY){
    snakeBody.push([foodX, foodY])
    placeFood();
  }
  //moving the tail/body together with the head
  for( let i= snakeBody.length-1; i>0; i-- ){
    snakeBody[i] =snakeBody[i-1 ];
  }
  if (snakeBody.length){
    snakeBody[0] = [snakeX, snakeY];
  }

  //snake head size
  context.fillStyle = "blue";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY,blockSize, blockSize);

  for (let i= 0; i < snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  //game over conditions
  if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
    gameOver = true;
    
    alert("The Game is Over");
  }
  for (let i = 0; i , snakeBody.length; i ++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver =true;
        alert("The Game is Over");
    }
  }
}

// snake direction moves control
function changeDirection(event){
    if (event.code =="ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (event.code =="ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (event.code =="ArrowLeft" && velocityX != 1 ){
        velocityX = -1;
        velocityY = 0;
    }
    else if (event.code =="ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
// making the food placed randomly
function placeFood(){
    //math.random returns a number between 0-1 then * (0-19cols or rows) * 25 blocksize
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;


}