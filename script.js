const gameBoard = (function(){
    // Create an array to represent the game board
    const board = Array(9).fill("");

    const getBoard = () => board;

    const setMarker = (index, marker) => {
        if (board[index] === "") {
          board[index] = marker;
          return true;
        }
        return false;
      };

      const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
      };


    return { getBoard, setMarker, resetBoard }
})();

// DisplayController module
const displayController = (function() {
    const printBoard = () => {
      const board = gameBoard.getBoard();
      console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
      console.log("---------");
      console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
      console.log("---------");
      console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
    };
  
    return { printBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
}

const checkwin = (function checkWin() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function check() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const gameState = gameBoard.getBoard();
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
    
            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
        return roundWon;
    }

    return { check }
})();

function handleClick(event) {

}