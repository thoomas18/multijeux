document.addEventListener('DOMContentLoaded', () => {
    const onePlayerButton = document.getElementById('one-player');
    const twoPlayersButton = document.getElementById('two-players');

    // Redirection vers le mode 1 joueur
    onePlayerButton.addEventListener('click', () => {
        window.location.href = 'morpion-one-player.html'; // Redirige vers le mode 1 joueur
    });

    // Redirection vers le mode 2 joueurs
    twoPlayersButton.addEventListener('click', () => {
        window.location.href = 'morpion-two-players.html'; // Redirige vers le mode 2 joueurs
    });
});