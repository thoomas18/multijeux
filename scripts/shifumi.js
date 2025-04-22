let manchesJouees = 0;
let victoiresJoueur = 0;
let victoiresProgramme = 0;
let nomJoueur = "Joueur"; // Nom par défaut

const options = ["🪨", "📃", "✂️"];
const buttonContainer = document.querySelector(".button-container");

// Gestion de l'écran d'accueil
document.getElementById("playerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const playerNameInput = document.getElementById("playerName");
    nomJoueur = playerNameInput.value || "Joueur"; // Utilise "Joueur" si aucun nom n'est saisi
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    initGame();
    updateChartLabel();
});

// Initialisation du graphique
const ctx = document.getElementById("scoreChart").getContext("2d");
const scoreChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], // Les manches jouées
        datasets: [
            {
                label: nomJoueur,
                data: [],
                borderColor: "#0074D9", // Bleu vif
                backgroundColor: "rgba(0, 116, 217, 0.2)", // Bleu clair transparent
                fill: true,
            },
            {
                label: "Baymax",
                data: [],
                borderColor: "#FF4136", // Rouge vif
                backgroundColor: "rgba(255, 65, 54, 0.2)", // Rouge clair transparent
                fill: true,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Manches",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Score",
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
        },
    },
});

// Mise à jour du label du graphique avec le nom du joueur
function updateChartLabel() {
    scoreChart.data.datasets[0].label = nomJoueur;
    scoreChart.update();
}

// Mise à jour du graphique
function updateChart() {
    scoreChart.data.labels.push("Manche " + manchesJouees);
    scoreChart.data.datasets[0].data.push(victoiresJoueur);
    scoreChart.data.datasets[1].data.push(victoiresProgramme);
    scoreChart.update();
}

// Initialisation du jeu
function initGame() {
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => jouerManche(option));
        buttonContainer.appendChild(button);
    });
}

function jouerManche(choixJoueur) {
    const choixProgramme = options[Math.floor(Math.random() * options.length)];
    let resultat = "";

    if (choixJoueur === choixProgramme) {
        resultat = "Égalité ! 🟰";
    } else if (
        (choixJoueur === "🪨" && choixProgramme === "✂️") ||
        (choixJoueur === "📃" && choixProgramme === "🪨") ||
        (choixJoueur === "✂️" && choixProgramme === "📃")
    ) {
        resultat = `Vous avez gagné, ${nomJoueur} ! 🎉`;
        victoiresJoueur++;
    } else {
        resultat = "Baymax a gagné ! 🤖";
        victoiresProgramme++;
    }

    manchesJouees++;

    document.getElementById("choices").textContent = `${nomJoueur} a choisi : ${choixJoueur}, Baymax a choisi : ${choixProgramme}.`;
    document.getElementById("result").textContent = resultat;
    document.getElementById("score").textContent = `Parties jouées : ${manchesJouees} | Victoires de ${nomJoueur} : ${victoiresJoueur} | Victoires de Baymax : ${victoiresProgramme}`;

    // Mettre à jour le graphique
    updateChart();
}

