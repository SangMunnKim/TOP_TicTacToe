const gameBoard = (function(){

    const board = Array(9).fill(null);


    return {
        GetBoard: () => board,
        UpdateBoard: (index, value) => board[index] = value,
    }
})();

function checkWin() {

}

function handleClick(event) {

}