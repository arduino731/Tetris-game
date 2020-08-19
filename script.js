document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const scoreDisplayColor = document.querySelector('.score');
    const startGame = document.querySelector('#start-game');
    const width = 10;
    let timerId;
    let nextRandom = 0;
    let score = 0;
    const speedPace = 400; // how fast tetromio move down
    colors =[
        '#00a8ff',
        '#9c88ff',
        '#4cd137',
        '#487eb0',
        '#dcdde1'
    ]

    //==============================================================================================================================================
    //==============================================================================================================================================
    const designTetrominoes = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2]
    ]
    // build Tetrominoes
    const lTetrominoesCustom = [
        [designTetrominoes[1],designTetrominoes[4],designTetrominoes[7],designTetrominoes[8]],
        [designTetrominoes[2],designTetrominoes[3],designTetrominoes[4],designTetrominoes[5]],
        [designTetrominoes[0],designTetrominoes[1],designTetrominoes[4],designTetrominoes[7]],
        [designTetrominoes[3],designTetrominoes[4],designTetrominoes[5],designTetrominoes[6]]
    ];    
    // console.log(lTetrominoesCustom[0]);
    const wholeTetrominoes = lTetrominoesCustom[0][0].concat(lTetrominoesCustom[0][1],lTetrominoesCustom[0][2],lTetrominoesCustom[0][3]);
    // console.log(wholeTetrominoes);
    const here = wholeTetrominoes.join('')
    console.log("want to add two digital and comma: " + here);
    // need to figuare it out how to covert into shape Tetromino [01, 11, 21, 02] probably RegExp???

    //==============================================================================================================================================
    //==============================================================================================================================================




    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let currentPosition = 4;
    let currentRotation = 0;
    let current = theTetrominoes[random][currentRotation];
    
    
    // draw the first rotation in the first tetromino
    function draw(){
        current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
        squares[currentPosition + index].style.backgroundColor = colors[random];
        // console.log(random);
      });
    }
    // draw();

    // undraw tetromino shape
    function undraw(){
      current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')  
        squares[currentPosition + index].style.backgroundColor = ''; 
    });
    }

    //assign functions to keyCodes
    function control(e){
      if(e.keyCode === 37){
          moveLeft();
      }
      else if(e.keyCode === 39){
          moveRight();
      }
      else if(e.keyCode === 40){
          moveDown();
      }
      else if(e.keyCode === 38){
          rotate();
      }
    }    
    
    // timerId = setInterval(moveDown, 500);
    document.addEventListener('keyup', control);
    
    function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }
    

    // freeze function
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            // console.log('next Random :' + nextRandom);
            // console.log('random :'+ random);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4; // reset grid number and repeat start at the middle top new tetromino
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    function moveLeft(){
      undraw();
      const isAtLeftEdge = current.some(index=> (currentPosition + index) % width === 0); // remainder width
      if(!isAtLeftEdge) currentPosition -=1; // the grid elements set from left to right so move to left side by negative one. 
      if(current.some(index=> squares[currentPosition + index].classList.contains('taken'))){
        currentPosition +=1;
      }
      draw();
    }

    function moveRight(){
      undraw();
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1); 
      if(!isAtRightEdge) currentPosition +=1; // the grid elements set from left to right so move to right side by add  one 
      if(current.some(index=> squares[currentPosition + index].classList.contains('taken'))){
          currentPosition -=1;
      }
      draw();
    }

    function rotate(){
        undraw();
        currentRotation++; 
        console.log(currentRotation);
        if(currentRotation === current.length){
            currentRotation = 0; 
        }
        current = theTetrominoes[random][currentRotation]; 
        draw();
    }


    // show up-next tetromino in mini-grid display
    const displaySquares = document.querySelectorAll(".mini-grid div");
    const displayWidth = 4; 
    const displayIndex = 0;

    //the Tetrominos without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    function displayShape() {
        //remove any trace of a tetromino form the entire grid
        displaySquares.forEach(square => {
          square.classList.remove('tetromino');
          square.style.backgroundColor ='';
        })
        upNextTetrominoes[nextRandom].forEach( index => {
          displaySquares[displayIndex + index].classList.add('tetromino')
          displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
      }

    // add functionality to the button
    startGame.addEventListener('click', ()=>{
        if(timerId){ // variable declared no value (undefined) 
            // console.log("variable declared no value");
            clearInterval(timerId); 
            // console.log(timerId);
            timerId = null; // Undefined means a variable has been declared but has no value: Null is an assignment:
        }else{
            draw();
            timerId = setInterval(moveDown, speedPace);
            // console.log(timerId); // not sure why output as 8? 
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    })
   

    function addScore(){
        for(let i = 0; i < 199; i += width){ // whole the grid 
            const row = [i, i+1, i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]; // each row contain 10 boxes and create arrays 
            if(row.every(index => squares[index].classList.contains('taken'))){ // true when it hits the taken class
                score += 10;
                scoreDisplay.innerHTML = score;

                row.forEach(index=>{ // remove completely the tetromino in a row removed only 10
                    // squares[index].classList.add('animate__animated','animate__zoomOut');
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = '';
                }) 
             
                const squareRemoved = squares.splice(i, 10); // 10 is remove each row   
                // console.log(squareRemoved); // 10
                // console.log(squares); // 200
                squares = squareRemoved.concat(squares);// return new array
                // console.log(squares); // 210 

                squares.forEach(cell => {
                    // console.log(cell);
                    grid.appendChild(cell)
                });       
            }
        }
    }
    
    function gameOver(){
        if(current.some(index=> squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'Game Over';
            clearInterval(timerId);
            
            scoreDisplayColor.classList.remove('score');
            scoreDisplayColor.classList.add('animate2');
        }
    }


})