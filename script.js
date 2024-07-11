import * as GameLogic from './GameLogic.js';

function handleClick(event) {
    const index = event.target.dataset.index; // Assuming you have a data-index attribute on your clickable elements
    GameLogic.GameController.playRound(index);
}

// Attach the handleClick function to a button click event
document.querySelectorAll('button[data-index]').forEach(button => {
    button.addEventListener('click', handleClick);
});

// Expose GameLogic to the global window object for console access
window.GL = GameLogic;
