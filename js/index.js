
//start canvas drawing 
window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    const scoreElement = document.getElementById('score');
    const restartBtn = document.getElementById('restart');
    restartBtn.style.display = 'none';

    
    let playerX = 0;
    let playerY = 0;
    let playerWidth = 150;
    let playerHeight = 150;
    let animationId;
    let beerX = 900;
    let beerY = 0;
    let beerWidth = 150;
    let beerHeight = 70;
    // let gameOverX = 0;
    // let gameOverY = 0;



    
    //background
    const starsImg = new Image()
    starsImg.src = '/Images/space.png'
    let starsX = 0;
    let stars2 = canvas.width;
    //player 
    const playerImg = new Image()
    playerImg.src = 'Images/pena2.png'
    //obstecals draw
    const mushroomImg = new Image()
    mushroomImg.src = 'Images/mushroom.png'
    
    const escobarImg = new Image()
    escobarImg.src = 'Images/pablo.png'
    
    const beerImg = new Image()
    beerImg.src ='Images/beer.png'
    
    const groguImg = new Image()
    groguImg.src ='Images/grogu.png'

    // const gameOverImg = new Image()
    // gameOverImg.src ='../Images/psychotic Pedro.gif'
    //

    //keyboard keys reference 
    let isMovingDown = false;
    let isMovingUp = false;
    let isMovingLeft = false;
    let isMovingRight = false;
    
    //speed and progress
    let isGameOver = false;
    let score = 0;
    let speed = 3;
    
    //obstcales random possion 
    let randomYPlacement = () => {
    let max = canvas.width ;
    let min = 0;
    let randomY = Math.floor(Math.random() * (max - min + 1) + min);
    return randomY;
    }
    
    let obstaclesArr = [ { Image: mushroomImg, x:800,y: randomYPlacement(), width: 80, height: 80 },
    { Image: escobarImg, x: 1000, y: randomYPlacement(), width: 250, height: 150 },
    { Image: groguImg, x: 800, y: randomYPlacement(), width: 150, height: 150 }
    ];
    
    //Game Loop 
    const animate = () => {
    ctx.clearRect(0 , 0, canvas.width, canvas.height);
    ctx.drawImage(starsImg, starsX, 0, canvas.width, canvas.height);
    ctx.drawImage(starsImg, stars2 , 0, canvas.width, canvas.height);

//    starsX %= canvas.width
//     starsX -= speed;
//     stars2 -= speed;

//     if (starsX < -canvas.width) {
//         starsX = canvas.width
//     } 
//     if (stars2 < -canvas.width) {
//     stars2 = canvas.width
//     };



    ctx.drawImage(playerImg, playerX, playerY, 300, 250);
    ctx.drawImage(beerImg, beerX, beerY, 150, 70);





    //obstcales loop
    for (let i = 0; i < obstaclesArr.length; i++) {
    ctx.drawImage(
    obstaclesArr[i].Image,
    obstaclesArr[i].x,
    obstaclesArr[i].y,
    obstaclesArr[i].width,
    obstaclesArr[i].height
    )
    
    obstaclesArr[i].x -= speed;
    console.log(speed)
    if(obstaclesArr[i].x < 0) {
    obstaclesArr[i].x = 1000;
    obstaclesArr[i].y = randomYPlacement()
    speed++
    } 
     
    if (
        playerX < obstaclesArr[i].x + obstaclesArr[i].width &&
        playerX + playerWidth > obstaclesArr[i].x &&
        playerY < obstaclesArr[i].y + obstaclesArr[i].height &&
        playerHeight + playerY > obstaclesArr[i].y
      ) {
     isGameOver = true;
      } 
        
      if (
          playerX < beerX + beerWidth &&
          playerX + playerWidth > beerX &&
          playerY < beerY + beerHeight &&
          playerHeight + playerY > beerY
          ) {
              score++
              console.log(score)
              beerX = 1000;
              beerY = randomYPlacement()
              scoreElement.innerHTML = score
            }

            beerX -= 2;
            if (beerX < 0) {
                beerX = 1000;
                beerY = randomYPlacement()
            }
        }
    

    if (isGameOver) {
     restartBtn.style.display ='block';
     cancelAnimationFrame(animationId);
     ctx.font = "Press Start 2P"
     ctx.fillText('You killed Pedro :(', 700, 300)
     ctx.fillStyle = "red"
    //  ctx.drawImage(gameOverImg, gameOverX, gameOverY, 100, 350)
    }  else {
     animationId = requestAnimationFrame(animate);
    }  

    //player movment 
    if(isMovingDown){
        playerY +=3
    } else if (isMovingUp) {
        playerY -=3
    } else if (isMovingLeft) {
        playerX -=3 
    } else if (isMovingRight) {
        playerX +=3
    }      
}

let restartGame = () => {
    window.location.reload();
}

const startGame = () => {
document.querySelector('.game-intro').style.display = 'none';
document.querySelector('#game-board').style.display = 'block';

    animate()
    };



document.getElementById('start-button').addEventListener('click', () => {
// document.getElementById('score').innerHTML = 'Score' + score;
startGame()

console.log('startBtn clicked')   


});

restartBtn.addEventListener('click', () => {
    restartGame()
    console.log( 'start game')
})

    


 document.addEventListener('keydown', function(event) {
 if (event.key === 'ArrowUp') {
  isMovingUp = true;
 } else if (event.key === 'ArrowDown') {
  isMovingDown = true;
 } else if (event.key === 'ArrowLeft') {
 isMovingLeft = true;
 } else if (event.key === 'ArrowRight') {
  isMovingRight = true;
 } 
 });
    
document.addEventListener('keyup', function(event) {
isMovingDown = false;
isMovingUp = false; 
isMovingLeft = false;
isMovingRight = false;
});
     


    
    
});  
    