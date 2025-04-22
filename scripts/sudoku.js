document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('sudoku-board');
    const validateButton = document.getElementById('validate-button');
    const timerDisplay = document.getElementById('timer');
    const backButton = document.getElementById('back-button');

    let timer;
    let startTime;

    // Génère une grille de Sudoku valide
    function generateCompleteSudoku() {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

        function isValid(num, row, col) {
            for (let i = 0; i < 9; i++) {
                if (grid[row][i] === num || grid[i][col] === num) return false;
                const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
                const boxCol = 3 * Math.floor(col / 3) + (i % 3);
                if (grid[boxRow][boxCol] === num) return false;
            }
            return true;
        }

        function fillGrid() {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (grid[row][col] === 0) {
                        const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
                        for (const num of numbers) {
                            if (isValid(num, row, col)) {
                                grid[row][col] = num;
                                if (fillGrid()) return true;
                                grid[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        fillGrid();
        return grid;
    }

    // Masque des cases en fonction du niveau de difficulté
    function maskGrid(grid, level) {
        const levels = { easy: 25, medium: 50, hard: 60 }; // Nombre de cases à masquer
        const maskedGrid = grid.map(row => [...row]);
        let cellsToRemove = levels[level];

        while (cellsToRemove > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (maskedGrid[row][col] !== 0) {
                maskedGrid[row][col] = 0;
                cellsToRemove--;
            }
        }

        return maskedGrid;
    }

    // Affiche la grille de Sudoku
    function displaySudoku(grid) {
        board.innerHTML = '';
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                if (cell !== 0) {
                    input.value = cell;
                    input.disabled = true;
                }
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                board.appendChild(input);
            });
        });
    }

    // Démarre le timer
    function startTimer() {
        startTime = Date.now();
        timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
            const seconds = String(elapsedTime % 60).padStart(2, '0');
            timerDisplay.textContent = `Temps : ${minutes}:${seconds}`;
        }, 1000);
    }

    // Valide la grille
    function validateSudoku(originalGrid) {
        const inputs = board.querySelectorAll('input');
        let isComplete = true;

        inputs.forEach(input => {
            const row = input.dataset.row;
            const col = input.dataset.col;
            const value = parseInt(input.value, 10);
            if (value === originalGrid[row][col]) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
                isComplete = false;
            }
        });

        if (isComplete) {
            clearInterval(timer);

            // Récupérer le temps écoulé
            const elapsedTime = timerDisplay.textContent.replace('Temps : ', '').trim();

            // Afficher le message de fin
            const endMessage = document.getElementById('end-message');
            const endText = document.getElementById('end-text');
            endText.textContent = `Félicitations, vous l'avez terminé en ${elapsedTime} !`;
            endMessage.classList.add('show');

            // Bouton pour rejouer
            const restartButton = document.getElementById('restart-button');
            restartButton.addEventListener('click', () => {
                window.location.reload(); // Recharge la page pour rejouer
            });
        }
    }

    // Initialisation
    const params = new URLSearchParams(window.location.search);
    const level = params.get('level') || 'easy';
    const completeGrid = generateCompleteSudoku();
    const maskedGrid = maskGrid(completeGrid, level);

    displaySudoku(maskedGrid);
    startTimer();

    validateButton.addEventListener('click', () => validateSudoku(completeGrid));
    backButton.addEventListener('click', () => {
        clearInterval(timer);
        window.location.href = 'sudoku-mode.html';
    });
});