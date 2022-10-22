const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')
let circleTurn;
const winningMessageTextElement =  document.querySelector('[data-winning-message-text]');

//restart
restartButton.addEventListener('click', startGame)


startGame();

//start game - adds event listener to each cell and adds x or circle to board so that hover works
function startGame(){
    circleTurn = false;
    //eventlistener on each cell just once
    cellElements.forEach(cell => {
        //removes x and o
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show')
}

//e is event listener
function handleClick(e){
    
    //get cell we clicked on
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; 

    //**place mark
    placeMark(cell, currentClass);
    //check win
    if(checkWin(currentClass)){
        endGame(false);
    }//check draw
    else if(isDraw()){
        endGame(true);
    }else{
        //swap turns
        swapTurns();
        //adds class for hover x or circle
        setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's "} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
};

function swapTurns(){
    circleTurn = ! circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}