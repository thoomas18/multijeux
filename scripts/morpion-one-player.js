document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerTurnDisplay = document.getElementById('player-turn');
    const restartGameButton = document.getElementById('restart-game');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let playerName = '';

    // Création de l'interface pour entrer le nom
    const nameInputContainer = document.createElement('div');
    nameInputContainer.style.display = 'flex';
    nameInputContainer.style.flexDirection = 'column';
    nameInputContainer.style.alignItems = 'center';
    nameInputContainer.style.justifyContent = 'center';
    nameInputContainer.style.height = '100vh';
    nameInputContainer.style.backgroundColor = '#f4f4f4';
    nameInputContainer.style.padding = '20px';
    nameInputContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    nameInputContainer.style.position = 'absolute';
    nameInputContainer.style.top = '0';
    nameInputContainer.style.left = '0';
    nameInputContainer.style.width = '100%';
    nameInputContainer.style.zIndex = '1000';

    const nameInputTitle = document.createElement('h2');
    nameInputTitle.textContent = 'Entrez votre nom pour commencer :';
    nameInputTitle.style.fontSize = '1.5rem';
    nameInputTitle.style.color = '#333';
    nameInputTitle.style.marginBottom = '20px';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Votre nom';
    nameInput.style.margin = '10px';
    nameInput.style.padding = '15px';
    nameInput.style.fontSize = '1.2rem';
    nameInput.style.borderRadius = '10px';
    nameInput.style.border = '1px solid #ccc';
    nameInput.style.width = '80%';
    nameInput.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    nameInput.style.transition = 'box-shadow 0.3s ease';

    nameInput.addEventListener('focus', () => {
        nameInput.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });

    nameInput.addEventListener('blur', () => {
        nameInput.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    });

    const nameSubmitButton = document.createElement('button');
    nameSubmitButton.textContent = 'Commencer';
    nameSubmitButton.style.padding = '15px 30px';
    nameSubmitButton.style.fontSize = '1.2rem';
    nameSubmitButton.style.color = '#fff';
    nameSubmitButton.style.backgroundColor = '#007BFF';
    nameSubmitButton.style.border = 'none';
    nameSubmitButton.style.borderRadius = '10px';
    nameSubmitButton.style.cursor = 'pointer';
    nameSubmitButton.style.marginTop = '20px';
    nameSubmitButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    nameSubmitButton.style.transition = 'background 0.3s ease, transform 0.2s ease';

    nameSubmitButton.addEventListener('mouseover', () => {
        nameSubmitButton.style.backgroundColor = '#0056b3';
        nameSubmitButton.style.transform = 'scale(1.05)';
    });

    nameSubmitButton.addEventListener('mouseout', () => {
        nameSubmitButton.style.backgroundColor = '#007BFF';
        nameSubmitButton.style.transform = 'scale(1)';
    });

    nameSubmitButton.addEventListener('click', () => {
        const enteredName = nameInput.value.trim();
        if (enteredName) {
            playerName = enteredName;
            nameInputContainer.remove();
            initializeGame();
        } else {
            alert('Veuillez entrer un nom pour commencer.');
        }
    });

    nameInputContainer.appendChild(nameInputTitle);
    nameInputContainer.appendChild(nameInput);
    nameInputContainer.appendChild(nameSubmitButton);
    document.body.prepend(nameInputContainer);

    function initializeGame() {
        playerTurnDisplay.textContent = `C'est à ${playerName} de jouer !`;
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
            cell.addEventListener('click', () => handlePlayerMove(index));
        });
        restartGameButton.classList.add('hidden');
    }

    function handlePlayerMove(index) {
        if (!board[index]) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                playerTurnDisplay.textContent = `${playerName} a gagné ! 🎉`;
                endGame();
            } else if (board.every(cell => cell)) {
                playerTurnDisplay.textContent = `Match nul ! 🤝`;
                endGame();
            } else {
                currentPlayer = 'O';
                playerTurnDisplay.textContent = `Tour de l'ordinateur...`;
                setTimeout(handleComputerMove, 1000);
            }
        }
    }

    function handleComputerMove() {
        const availableMoves = board
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);

        // Vérifier si l'IA peut gagner
        for (const move of availableMoves) {
            board[move] = 'O';
            if (checkWinner('O')) {
                makeMove(move, currentPlayer);
                playerTurnDisplay.textContent = `L'ordinateur a gagné ! 😢`;
                endGame();
                return;
            }
            board[move] = null;
        }

        // Vérifier si le joueur peut gagner et bloquer
        for (const move of availableMoves) {
            board[move] = 'X';
            if (checkWinner('X')) {
                board[move] = null;
                makeMove(move, currentPlayer);
                currentPlayer = 'X';
                playerTurnDisplay.textContent = `C'est à ${playerName} de jouer !`;
                return;
            }
            board[move] = null;
        }

        // Sinon, jouer aléatoirement
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeMove(randomMove, currentPlayer);

        if (checkWinner(currentPlayer)) {
            playerTurnDisplay.textContent = `L'ordinateur a gagné ! 😢`;
            endGame();
        } else if (board.every(cell => cell)) {
            playerTurnDisplay.textContent = `Match nul ! 🤝`;
            endGame();
        } else {
            currentPlayer = 'X';
            playerTurnDisplay.textContent = `C'est à ${playerName} de jouer !`;
        }
    }

    function findBestMoveAI() {
        let bestScore = -Infinity;
        let move = null;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                const score = minimax(board, 0, false);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        if (checkWinner('O')) return 10 - depth;
        if (checkWinner('X')) return depth - 10;
        if (board.every(cell => cell !== null)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function makeMove(index, player) {
        if (index !== null && board[index] === null) {
            board[index] = player;
            cells[index].textContent = player;
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