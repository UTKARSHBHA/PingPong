// alert("js testing !!");
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBounds = board.getBoundingClientRect();
let x = true;
let y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;

document.addEventListener("keydown" , function(e){
    if(e.key === "w"){
        movePaddle(leftPaddle , -window.innerHeight *0.1);
    }
    else if(e.key === "s"){
        movePaddle(leftPaddle , window.innerHeight *0.1);
        
    }
    else if(e.key === "ArrowUp"){
        movePaddle(rightPaddle , -window.innerHeight *0.1);
        
    }
    else if(e.key === "ArrowDown"){
        movePaddle(rightPaddle , window.innerHeight *0.1);

    }
})


function setColor(idx){
    let allicons = document.querySelectorAll(".fas,fa-circle");
    allicons[idx].style.color = "#686de0";
}

function movePaddle(cPaddle , change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change >= boardBounds.top && cPaddleBounds.bottom+change <= boardBounds.bottom){

        cPaddle.style.top = cPaddleBounds.top + change + "px";
    }

}

function resetGame(){
    ball.style.top = window.innerHeight*0.45+"px";
    ball.style.left = window.innerWidth*0.50+"px";
    requestAnimationFrame(moveBall);
}

function moveBall(){
    let ballcord = ball.getBoundingClientRect();
    let ballTop = ballcord.top;
    let ballLeft = ballcord.left;
    let ballBottom = ballcord.bottom;
    let ballRight = ballcord.right;

    let hasTouchedLeft = ballLeft <= boardBounds.left;
    let hasTouchedRight = ballRight >= boardBounds.right;
    // if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives === 0){
                alert("Player Two Won !! 🏆");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }
        if(hasTouchedRight){
            rightPlayerLives--;
            setColor(3+rightPlayerLives);
            if(rightPlayerLives === 0){
                alert("Player One Won !! 🏆");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }
    // }

    if(ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom){
        y = !y;
    }
    if(ballLeft <= boardBounds.left || ballRight >= boardBounds.right){
        x = !x;
    }

    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballBottom >= leftPaddleBounds.top && ballTop <= leftPaddleBounds.bottom){
        x = !x;
    }
    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballBottom >= rightPaddleBounds.top && ballTop <= rightPaddleBounds.bottom){
        x = !x;
    }

    ball.style.top = (y === true ? ballTop+4+"px" : ballTop-4+"px");
    ball.style.left = (x === true ? ballLeft+4+"px" : ballLeft-4+"px");
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
