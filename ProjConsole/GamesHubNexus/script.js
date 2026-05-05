const games = [
    {
        title: "Jokenpô",
        link: "jokenpo.html",
        img: "https://via.placeholder.com/150x100?text=Jokenpo"
    },
    {
        title: "Cara ou Coroa",
        link: "cara_coroa.html",
        img: "https://via.placeholder.com/150x100?text=Cara+Coroa"
    },
    {
        title: "Jogo dos Dados",
        link: "dados.html",
        img: "https://via.placeholder.com/150x100?text=Dados"
    }
];

const grid = document.getElementById("gamesGrid");

games.forEach(game => {
    const card = document.createElement("a");
    card.href = game.link;
    card.className = "game-card";

    card.innerHTML = `
        <img src="${game.img}">
        <div class="game-title">${game.title}</div>
    `;

    grid.appendChild(card);
});

