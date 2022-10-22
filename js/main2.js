class Board{
    constructor(board, X_CLASS, CIRCLE_CLASS){
        this.board = board;
        this.X_CLASS = X_CLASS;
        this.CIRCLE_CLASS = CIRCLE_CLASS
    }
    setBoardHoverClass(){
        this.board.classList.remove(this.X_CLASS);
        this.board.classList.remove(this.CIRCLE_CLASS);
    }
}

