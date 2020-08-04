document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    let squares = document.querySelectorAll('.grid div');
    const displayScore = document.querySelector('#score');
    const startGame = document.querySelector('#start-game');
    const width = 10;// ??????
    let timerId;

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
    console.log(here);


    // need to figuare it out how to covert into shape Tetromino [1, 11, 21, 2] probably RegExp???

    //=======================================================================

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
    console.log(theTetrominoes[0]);
    console.log(theTetrominoes);
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let currentPosition = 4;
    let currentRotation = 0;
    let current = theTetrominoes[random][currentRotation];

    // draw the first rotation in the first tetromino
    function draw(){
        current.forEach(index => {
        squares[currentPosition + index ].classList.add('tetromino');
      });
    }

    // undraw tetromino shape
    function undraw(){
      current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')  
        // squares[index].style.backgroundColor = '';  
    });
    }

    /*

        if(keycode === 'down') {
            call function as loop
        if (squares[index].matches('tetromino')) {
            remove class from that index
            add class in (index + 10)
            squares[index + 10].class
        }
        }
    */   
    // newDraw create new tetromino shape
    function newDraw(){
        current.map(index =>{
            squares[currentPosition + index+ 10].classList.add('tetromino');
            console.log(squares); 
            //squares += [index+10];
        })
    }    
    


    
    
    window.addEventListener('keydown', (e) => {
        if(e.keyCode === 13){// Enter to start game
            draw();
            timerId = setInterval(moveDownAuto, 500);
        }

        //match key code all the arrows. 

    })    
    
    function moveDownAuto(){
    undraw();
    currentPosition += 10;
    newDraw();
    }
moveDownAuto(); // motionable the tetromino game.



    // clearInterval(timerId);
    // draw();
    


     

















     
    function controls(e){
      window.keyCode;
      console.log(e);
    }

    window.addEventListener('keydown', event=>{
        console.log(event.keyCode);
    })


} )