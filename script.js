
document.getElementById("addPlayer").addEventListener("click", addPlayer);
document.getElementById("assignRoles").addEventListener("click", assignRoles);
document.getElementById("sixPlayersToggle")?.addEventListener("change", () => {
  const maxPlayers = document.getElementById("sixPlayersToggle").checked ? 6 : 7;
  let players = document.querySelectorAll(".player-entry");
  while (players.length > maxPlayers) {
    players[players.length - 1].remove();
    players = document.querySelectorAll(".player-entry");
  }
});


function addPlayer() {
  const maxPlayers = document.getElementById("sixPlayersToggle")?.checked ? 6 : 7;
  const playersDiv = document.getElementById("players");
  const currentPlayers = playersDiv.querySelectorAll(".player-entry").length;
  if (currentPlayers >= maxPlayers) {
    alert(`Nombre maximum de joueurs atteint (${maxPlayers}).`);
    return;
  }

  const playerEntry = document.createElement("div");
  playerEntry.classList.add("player-entry");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Nom du joueur";
  nameInput.classList.add("name-input");

  const moneyDisplay = document.createElement("div");
  moneyDisplay.classList.add("money-display");

  const dollar = document.createElement("span");
  dollar.textContent = "$";

  const moneyValue = document.createElement("div");
  moneyValue.classList.add("money-value");
  moneyValue.textContent = "10000";

  moneyDisplay.appendChild(dollar);
  moneyDisplay.appendChild(moneyValue);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("money-buttons");

  let positive = true;
  const signToggle = document.createElement("button");
  signToggle.textContent = "+";
  signToggle.classList.add("sign-toggle");
  signToggle.addEventListener("click", () => {
    positive = !positive;
    signToggle.textContent = positive ? "+" : "−";
  });
  buttonsDiv.appendChild(signToggle);

  [500, 1000, 3000].forEach(amount => {
    const btn = document.createElement("button");
    btn.textContent = amount;
    btn.addEventListener("click", () => {
      const current = parseInt(moneyValue.textContent, 10);
      const delta = positive ? amount : -amount;
      moneyValue.textContent = current + delta;
    });
    buttonsDiv.appendChild(btn);
  });

  playerEntry.appendChild(nameInput);
  playerEntry.appendChild(moneyDisplay);
  playerEntry.appendChild(buttonsDiv);

  playersDiv.appendChild(playerEntry);
}

function assignRoles() {
  const names = [];
  const money = [];
  const entries = document.querySelectorAll(".player-entry");

  entries.forEach(entry => {
    const name = entry.querySelector(".name-input").value.trim();
    const moneyVal = entry.querySelector(".money-value").textContent;
    if (name) {
      names.push(name);
      money.push(moneyVal);
    }
  });

  const sixPlayers = document.getElementById("sixPlayersToggle")?.checked;
  const maxPlayers = sixPlayers ? 6 : 7;

  if (names.length !== maxPlayers) {
    alert(`Il faut exactement ${maxPlayers} joueurs.`);
    return;
  }

  const roles = sixPlayers
    ? ["Shériff", "Maire", "Bandit", "Chef de Saloon", "Juge", "Banquier"]
    : ["Shériff", "Maire", "Bandit", "Chef de Saloon", "Juge", "Banquier", "Croque-mort"];

  const shuffledRoles = roles.sort(() => 0.5 - Math.random());

  const assigned = names.map((name, i) => `${name} : ${shuffledRoles[i]} — ${money[i]}$`);
  
  const table = document.createElement("table");
  table.classList.add("result-table");

  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Joueur</th><th>Rôle</th><th>Argent</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  names.forEach((name, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${shuffledRoles[i]}</td><td>${money[i]}$</td>`;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  resultDiv.appendChild(table);

}
