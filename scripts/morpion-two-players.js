document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerTurnDisplay = document.getElementById('player-turn');
    const restartGameButton = document.getElementById('restart-game');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let playerXName = '';
    let playerOName = '';

    // Création de l'interface pour entrer les prénoms
    const nameInputContainer = document.createElement('div');
    nameInputContainer.style.display = 'flex';
    nameInputContainer.style.flexDirection = 'column';
    nameInputContainer.style.alignItems = 'center';
    nameInputContainer.style.justifyContent = 'center';
    nameInputContainer.style.height = '100vh';
    nameInputContainer.style.backgroundColor = '#f4f4f4';
    nameInputContainer.style.padding = '20px';
    nameInputContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';

    const playerXInput = document.createElement('input');
    playerXInput.type = 'text';
    playerXInput.placeholder = 'Nom du joueur X';
    playerXInput.style.margin = '10px';
    playerXInput.style.padding = '15px';
    playerXInput.style.fontSize = '1.2rem';
    playerXInput.style.borderRadius = '10px';
    playerXInput.style.border = '1px solid #ccc';
    playerXInput.style.width = '80%';

    const playerOInput = document.createElement('input');
    playerOInput.type = 'text';
    playerOInput.placeholder = 'Nom du joueur O';
    playerOInput.style.margin = '10px';
    playerOInput.style.padding = '15px';
    playerOInput.style.fontSize = '1.2rem';
    playerOInput.style.borderRadius = '10px';
    playerOInput.style.border = '1px solid #ccc';
    playerOInput.style.width = '80%';

    const startButton = document.createElement('button');
    startButton.textContent = 'Commencer';
    startButton.style.padding = '15px 30px';
    startButton.style.fontSize = '1.2rem';
    startButton.style.color = '#fff';
    startButton.style.backgroundColor = '#007BFF';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '10px';
    startButton.style.cursor = 'pointer';
    startButton.style.marginTop = '20px';
    startButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    startButton.style.transition = 'background 0.3s ease, transform 0.2s ease';

    startButton.addEventListener('mouseover', () => {
        startButton.style.backgroundColor = '#0056b3';
        startButton.style.transform = 'scale(1.05)';
    });

    startButton.addEventListener('mouseout', () => {
        startButton.style.backgroundColor = '#007BFF';
        startButton.style.transform = 'scale(1)';
    });

    startButton.addEventListener('click', () => {
        const enteredPlayerXName = playerXInput.value.trim();
        const enteredPlayerOName = playerOInput.value.trim();

        if (enteredPlayerXName && enteredPlayerOName) {
            playerXName = enteredPlayerXName;
            playerOName = enteredPlayerOName;
            nameInputContainer.remove();
            initializeGame();
        } else {
            alert('Veuillez entrer les noms des deux joueurs pour commencer.');
        }
    });

    nameInputContainer.appendChild(playerXInput);
    nameInputContainer.appendChild(playerOInput);
    nameInputContainer.appendChild(startButton);
    document.body.prepend(nameInputContainer);

    function initializeGame() {
        playerTurnDisplay.textContent = `C'est au tour de ${currentPlayer === 'X' ? playerXName : playerOName} !`;
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
            cell.addEventListener('click', () => handleCellClick(index));
        });
        restartGameButton.classList.add('hidden');
    }

    function handleCellClick(index) {
        if (!board[index]) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                playerTurnDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} a gagné ! 🎉`;
                endGame();
            } else if (board.every(cell => cell)) {
                playerTurnDisplay.textContent = `Match nul ! 🤝`;
                endGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                playerTurnDisplay.textContent = `C'est au tour de ${currentPlayer === 'X' ? playerXName : playerOName} !`;
            }
        }
    }

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

    function endGame() {
        cells.forEach(cell => cell.style.pointerEvents = 'none');
        restartGameButton.classList.remove('hidden');
    }

    restartGameButton.addEventListener('click', () => {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        initializeGame();
    });
});