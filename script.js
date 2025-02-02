const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

let artistsData = []; // Armazena os dados para filtrar no frontend

// Buscar todos os artistas ao carregar a página
function fetchAllArtists() {
    fetch("http://localhost:3000/artists") // Busca todos os artistas de uma vez
        .then(response => response.json())
        .then(data => {
            artistsData = data; // Guarda os dados na variável global
        })
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

// Exibir resultados filtrados
function displayResults(filteredArtists) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ""; // Limpa os resultados anteriores

    if (filteredArtists.length === 0) {
        gridContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
        return;
    }

    filteredArtists.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <div class="card-img">
                <img src="${element.urlImg}" alt="${element.name}" class="artist-img" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;

        gridContainer.appendChild(artistCard);
    });
}

// Filtrar os artistas quando o usuário digita
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    // Filtrando os artistas no frontend
    const filteredArtists = artistsData.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm)
    );

    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
    
    displayResults(filteredArtists);
});

// Carregar todos os artistas ao iniciar a página
fetchAllArtists();
