const Player = (name, marker) => {
    return { name, marker };
}

const gameBoard = (function(){
    // Create an array to represent the game board
    let board = Array(9).fill("");

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


const GameController = (function() {
    const playerOne = Player("Player One", "X");
    const playerTwo = Player("Player Two", "O");

    let activePlayer = playerOne;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        displayController.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (index) => {
        const marker = getActivePlayer().marker;
        if (gameBoard.setMarker(index, marker)) {
            if (checkwin.check()) {
                displayController.printBoard();
                console.log(`${getActivePlayer().name} wins!`);
                gameBoard.resetBoard();
            } else {
                switchPlayerTurn();
                printNewRound();
            }
        } else {
            console.log("Invalid move. Try again.");
        }
    };

    return { playRound };

})();







function handleClick(event) {

}