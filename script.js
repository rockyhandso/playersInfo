  let players = {};
  let teams = [];

  const playerInput = document.getElementById("player-input");
  const teamInput = document.getElementById("team-input");

  const playerSuggestions = document.getElementById("player-suggestions");
  const teamSuggestions = document.getElementById("team-suggestions");

  fetch("./players.json")
    .then(res => res.json())
    .then(data => {
      players = data.players;
      teams = data.teams;
    });

  function createSuggestions(input, suggestionsDiv, list, isPlayer = false) {
    const value = input.value.toLowerCase().trim();
    suggestionsDiv.innerHTML = "";

    if (!value) return;

    const filtered = list.filter(item => item.toLowerCase().includes(value));

    filtered.forEach(suggestion => {
      const div = document.createElement("div");
      div.textContent = suggestion;
      div.onclick = () => {
        input.value = suggestion;
        suggestionsDiv.innerHTML = "";
        showPlayerDetails();
      };
      suggestionsDiv.appendChild(div);
    });
  }

  function showPlayerDetails() {
    const playerKey = playerInput.value.toLowerCase().trim();
    const teamKey = teamInput.value.toLowerCase().trim();

    const infoBox = document.getElementById("player-info");
    const bowlersBox = document.getElementById("bowlers-info");
    const bowlersList = document.getElementById("bowlers-list");

    if (players[playerKey]) {
      const player = players[playerKey];
      document.getElementById("name").textContent = player.name;
      document.getElementById("role").textContent = player.role;
      document.getElementById("team").textContent = player.team;
      document.getElementById("matches").textContent = player.matches;
      document.getElementById("other").textContent = player.other;

      infoBox.style.display = "block";

      bowlersList.innerHTML = "";
      const bowlers = player.outAgainst[teamKey];
      if (bowlers && bowlers.length > 0) {
        bowlers.forEach(b => {
          const li = document.createElement("li");
          li.textContent = b;
          bowlersList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "No data for this team.";
        bowlersList.appendChild(li);
      }

      bowlersBox.style.display = "block";
    } else {
      infoBox.style.display = "none";
      bowlersBox.style.display = "none";
    }
  }

  playerInput.addEventListener("input", () => {
    createSuggestions(playerInput, playerSuggestions, Object.keys(players), true);
  });

  teamInput.addEventListener("input", () => {
    createSuggestions(teamInput, teamSuggestions, teams, false);
  });