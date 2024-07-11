const cells = document.querySelectorAll('[data-cell]');
const dialog = document.querySelector('dialog');
const whoseTurn = document.querySelector('#whose-turn');
const resultBox = document.querySelector('.result');
const restart = document.querySelector('#restart');

const attachCellListeners = () => {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (event) => handleClick(event, index), { once: true });
    });
};

attachCellListeners();

function handleClick(event, index) {
    GameController.playRound(index);
    event.target.classList.add('no-pointer');
}

const Player = (name, marker) => {
    return { name, marker };
}

const gameBoard = (function(){
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
        board = Array(9).fill("");
        displayController.printBoard();
        attachCellListeners();  // Re-attach listeners after resetting the board
    };

    return { getBoard, setMarker, resetBoard };
})();

const displayController = (function() {
    const printBoard = () => {
        const board = gameBoard.getBoard();
        board.forEach((cell, index) => {
            cells[index].textContent = cell;
        });
    };

    const gameOver = (message) => {
        resultBox.textContent = message; // Update the result box with the message
        dialog.showModal();
    };

    return { printBoard, gameOver };
})();

const checkWin = (function checkWin() {
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
                break;
            }
        }
        return roundWon;
    }

    return { check };
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
        whoseTurn.textContent = `${getActivePlayer().name}'s turn.`;
    };

    const isBoardFull = () => {
        return gameBoard.getBoard().every(cell => cell !== "");
    };

    const playRound = (index) => {
        const marker = getActivePlayer().marker;
        if (gameBoard.setMarker(index, marker)) {
            if (checkWin.check()) {
                displayController.printBoard();
                setTimeout(() => displayController.gameOver(`${getActivePlayer().name} wins!`), 300);
            } else if (isBoardFull()) {
                displayController.printBoard();
                setTimeout(() => displayController.gameOver("It's a draw!"), 300);
            } else {
                switchPlayerTurn();
                printNewRound();
            }
        } else {
            console.log("Invalid move. Try again.");
        }
    };

    return { playRound, printNewRound };

})();

restart.addEventListener('click', () => {
    dialog.close();
    gameBoard.resetBoard();
    GameController.printNewRound();
});
