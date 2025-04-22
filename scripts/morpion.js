// This file contains the JavaScript code for the web application.
// It handles the interactive functionality, such as event listeners and DOM manipulation.

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerTurnDisplay = document.getElementById('player-turn');
    const restartGameButton = document.getElementById('restart-game');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';

    // Initialisation du jeu
    function initializeGame() {
        playerTurnDisplay.textContent = `C'est au tour de ${currentPlayer} !`;
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
            cell.addEventListener('click', () => handleCellClick(index));
        });
        restartGameButton.classList.add('hidden');
    }

    // Gestion du clic sur une case
    function handleCellClick(index) {
        if (!board[index]) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                playerTurnDisplay.textContent = `${currentPlayer} a gagné ! 🎉`;
                endGame();
            } else if (board.every(cell => cell)) {
                playerTurnDisplay.textContent = `Match nul ! 🤝`;
                endGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                playerTurnDisplay.textContent = `C'est au tour de ${currentPlayer} !`;
            }
        }
    }

    // Vérification du gagnant
    function checkWinner(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === player)
        );
    }

    // Fin du jeu
    function endGame() {
        cells.forEach(cell => cell.style.pointerEvents = 'none');
        restartGameButton.classList.remove('hidden');
    }

    // Réinitialisation du jeu
    restartGameButton.addEventListener('click', () => {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        initializeGame();
    });

    // Lancement du jeu
    initializeGame();
});