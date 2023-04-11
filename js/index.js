

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    console.log(ctx)
    
    let playerX = 0;
    let playerY = 0;
    // let starsX = 0;
    // let stars1X = -canvas.width
    
    
    const starsImg = new Image()
    starsImg.src = '/Images/Space_Stars2.png'
    
    const playerImg = new Image()
    playerImg.src = '/Images/pena.png'
    
    const mushroomImg = new Image()
    mushroomImg.src = '/Images/mushroom.png'
    
    const escobarImg = new Image()
    escobarImg.src = '/Images/pablo.png'
    
    const beerImg = new Image()
    beerImg.src ='/Images/beer.png'
    
    const groguImg = new Image()
    groguImg.src ='/Images/grogu.png'
    
    let isMovingDown = false;
    let isMovingUp = false;
    let isMovingLeft = false;
    let isMovingRight = false;
    
    let isGameOver = false;
    let score = 0;
    let speed = 3;
    
    
    let randomYPlacement = () => {
    let max = canvas.width ;
    let min = 0;
    let randomY = Math.floor(Math.random() * (max - min + 1) + min);
    return randomY;
    }
    
    let obstaclesArr = [ { Image: mushroomImg, x:800,y: randomYPlacement(), width: 80, height: 80 },
    { Image: escobarImg, x: 1000, y: randomYPlacement(), width: 200, height: 100 },
    { Image: beerImg, x: 900, y: randomYPlacement(), width:150, height: 70 },
    { Image: groguImg, x: 1100, y: randomYPlacement(), width: 90, height: 90 }
    ];
    
    
    const animate = () => {
    ctx.clearRect(0 ,0, canvas.width, canvas.height)
    ctx.drawImage(starsImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(playerImg, playerX, playerY, 150, 150) 
    
    
    for (let i = 0; i < obstaclesArr.length; i++) {
    ctx.drawImage(
    obstaclesArr[i].Image,
    obstaclesArr[i].x,
    obstaclesArr[i].y,
    obstaclesArr[i].width,
    obstaclesArr[i].height
    );
    
    obstaclesArr[i].x -= speed;
    if(obstaclesArr[i].x < 0) {
    obstaclesArr[i].x = 1300;
    obstaclesArr[i].y = randomYPlacement()
    } 
    }
    
    let checkCollision = () => {
        if (
            playerX < obstaclesArr[i].xPos + obstaclesArr[i].width &&
            playerX + carWidth > obstaclesArr[i].xPos &&
            playerY < obstaclesArr[i].yPos + obstaclesArr[i].height &&
            playerHeight + playerY > obstaclesArr[i].yPos
          ) {
         isGameOver = true;
    }
    }
    
    if(isMovingDown){
    playerY +=2
    } else if (isMovingUp) {
    playerY -=2
    } else if (isMovingLeft) {
    playerX -=2 
    } else if (isMovingRight) {
    playerX +=2
    }
    
    if (isGameOver) {
        cancelAnimationFrame();
    }  else {
    requestAnimationFrame(animate);
    } 
    
    
    
    
    }
    
    const startGame = () => {
    document.querySelector('.game-intro').style.display = 'none';
    document.querySelector('#game-board').style.display = 'block';
    animate()
    
    
    };
    
    
    
    document.getElementById('start-button').addEventListener('click', () => {
        startGame()
     console.log('startBtn clicked')   
    });
    
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
    