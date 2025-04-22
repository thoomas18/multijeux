document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('player-name');
    const startGameButton = document.getElementById('start-game');
    const gameSelection = document.getElementById('game-selection');
    const morpionGameButton = document.getElementById('morpion-game');
    const shifumiGameButton = document.getElementById('shifumi-game');

    startGameButton.addEventListener('click', () => {
        const playerName = playerNameInput.value || 'Joueur';
        localStorage.setItem('playerName', playerName); // Stocke le nom dans le localStorage
        document.getElementById('player-name-input').classList.add('hidden');
        gameSelection.classList.remove('hidden');
    });

    morpionGameButton.addEventListener('click', () => {
        window.location.href = 'morpion.html'; // Redirige vers le jeu Morpion
    });

    shifumiGameButton.addEventListener('click', () => {
        window.location.href = 'shifumi.html'; // Redirige vers le jeu Shifumi
    });
});