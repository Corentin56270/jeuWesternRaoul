const allRoles = ["Maire", "Bandit", "Banquier", "Juge", "Sheriff", "Croque-mort", "Chef de saloon"];

function addPlayer() {
  const playersDiv = document.getElementById("players");
  const inputCount = playersDiv.querySelectorAll(".name-input").length;
  if (inputCount >= 7) return;

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = `Joueur ${inputCount + 1}`;
  newInput.classList.add("name-input");
  playersDiv.appendChild(newInput);
}

function assignRoles() {
  const isSixPlayers = document.getElementById("sixPlayersToggle").checked;
  const inputs = document.querySelectorAll(".name-input");
  const names = Array.from(inputs).map(input => input.value.trim()).filter(name => name !== "");

  const roles = isSixPlayers ? allRoles.filter(r => r !== "Croque-mort") : [...allRoles];

  if (names.length !== roles.length || new Set(names).size !== names.length) {
    document.getElementById("result").innerText = "Erreur : entrez des noms uniques correspondant au nombre de rôles.";
    return;
  }

  const shuffledRoles = roles.sort(() => 0.5 - Math.random());
  const assignments = names.map((name, i) => \`\${name} : \${shuffledRoles[i]}\`);
  document.getElementById("result").innerHTML = assignments.join("<br>");
}
