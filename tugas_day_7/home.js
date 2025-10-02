// Ambil elemen
const form = document.getElementById("teamForm");
const cardsContainer = document.getElementById("teamCards");
const searchInput = document.getElementById("searchInput");

// Data default atau dari localStorage
let teams = JSON.parse(localStorage.getItem("teams")) || [
  {
    name: "PERSIJA JAKARTA",
    startYear: "1928",
    endYear: "",
    desc: "Persija Jakarta adalah klub sepak bola profesional dari Jakarta yang didirikan pada 28 November 1928, dikenal sebagai Macan Kemayoran, dan memiliki basis suporter The Jakmania.",
    competitions: ["Liga 1", "Liga Champions"],
    logo: "persija.jpg",
  },
  {
    name: "PERSIB BANDUNG",
    startYear: "1919",
    endYear: "",
    desc: "Persib Bandung adalah klub sepak bola profesional Indonesia dari Bandung, Jawa Barat, yang didirikan pada 14 Maret 1933. Julukannya Maung Bandung & Pangeran Biru, dengan basis fans Bobotoh.",
    competitions: ["Liga 1"],
    logo: "persib.jpg",
  },
];

// Render awal
renderTeams();

// Event submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("teamName").value;
  const startYear = document.getElementById("startYear").value;
  const endYear = document.getElementById("endYear").value;
  const desc = document.getElementById("teamDesc").value;

  const competitions = Array.from(
    form.querySelectorAll('input[type="checkbox"]:checked')
  ).map((c) => c.value);

  const logoInput = document.getElementById("teamLogo");
  let logoURL = "default.jpg";
  if (logoInput.files[0]) {
    logoURL = URL.createObjectURL(logoInput.files[0]);
  }

  const newTeam = { name, startYear, endYear, desc, competitions, logo: logoURL };

  teams.push(newTeam);
  localStorage.setItem("teams", JSON.stringify(teams));
  renderTeams();

  showPopup("Data berhasil disimpan ✅");
  form.reset();
});

// Fungsi render pakai map dan filter
function renderTeams(filterText = "") {
  cardsContainer.innerHTML = "";

  teams
    .filter((team) => team.name.toLowerCase().includes(filterText.toLowerCase()))
    .map((team, index) => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-img" style="background-image: url('${team.logo}');"></div>
        <div class="card-body">
          <h3><a href="Detail.html?index=${index}">${team.name}</a></h3>
          <p class="meta">Berdiri : ${team.startYear}${
        team.endYear ? " - " + team.endYear : ""
      }</p>
          <p class="desc">${team.desc}</p>
          <p><strong>Kompetisi:</strong> ${team.competitions.join(", ")}</p>
          <div class="icons"><span>🏆</span><span>⚽</span><span>🔥</span></div>
          <div class="card-actions">
            <button onclick="editTeam(${index})" class="btn btn-outline">edit</button>
            <button onclick="deleteTeam(${index})" class="btn btn-outline danger">hapus</button>
          </div>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
}

// Event filter saat user mengetik
searchInput.addEventListener("input", (e) => {
  renderTeams(e.target.value);
});

// Fungsi hapus
function deleteTeam(index) {
  teams.splice(index, 1);
  localStorage.setItem("teams", JSON.stringify(teams));
  renderTeams(searchInput.value);
}

// Fungsi edit
function editTeam(index) {
  const team = teams[index];
  document.getElementById("teamName").value = team.name;
  document.getElementById("startYear").value = team.startYear;
  document.getElementById("endYear").value = team.endYear;
  document.getElementById("teamDesc").value = team.desc;

  form.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = team.competitions.includes(cb.value);
  });

  teams.splice(index, 1);
  localStorage.setItem("teams", JSON.stringify(teams));
  renderTeams(searchInput.value);
}

// Popup
function showPopup(message, color = "#4caf50") {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.background = color;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}
