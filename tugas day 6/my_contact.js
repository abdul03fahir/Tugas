// Ambil elemen form dan card container
const form = document.getElementById("teamForm");
const cardsContainer = document.getElementById("teamCards");

// Ambil data dari localStorage atau pakai default
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

  // Ambil data input
  const name = document.getElementById("teamName").value;
  const startYear = document.getElementById("startYear").value;
  const endYear = document.getElementById("endYear").value;
  const desc = document.getElementById("teamDesc").value;

  // Ambil checkbox kompetisi
  const competitions = Array.from(
    form.querySelectorAll('input[type="checkbox"]:checked')
  ).map((c) => c.value);

  // Ambil file logo (jika ada)
  const logoInput = document.getElementById("teamLogo");
  let logoURL = "default.jpg"; // fallback
  if (logoInput.files[0]) {
    logoURL = URL.createObjectURL(logoInput.files[0]);
  }

  // Buat object tim
  const newTeam = {
    name,
    startYear,
    endYear,
    desc,
    competitions,
    logo: logoURL,
  };

  // Masukkan ke array
  teams.push(newTeam);

  // Simpan ke localStorage
  localStorage.setItem("teams", JSON.stringify(teams));

 // Render ulang cards
renderTeams();

// Tampilkan popup berhasil
showPopup("Data berhasil disimpan ✅");


  // Reset form
  form.reset();
});
// unutk lopping
function renderTeams() {
  cardsContainer.innerHTML = "";

  teams.forEach((team, index) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-img" style="background-image: url('${team.logo}');"></div>
      <div class="card-body">
        <h3><a href="my_project.html?index=${index}">${team.name}</a></h3>
        <p class="meta">Berdiri : ${team.startYear}${team.endYear ? " - " + team.endYear : ""}</p>
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




// Fungsi hapus tim
function deleteTeam(index) {
  teams.splice(index, 1);
  localStorage.setItem("teams", JSON.stringify(teams));
  renderTeams();
}

// Fungsi edit tim
function editTeam(index) {
  const team = teams[index];

  // Isi form dengan data lama
  document.getElementById("teamName").value = team.name;
  document.getElementById("startYear").value = team.startYear;
  document.getElementById("endYear").value = team.endYear;
  document.getElementById("teamDesc").value = team.desc;

  // Centang kembali kompetisi
  form.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = team.competitions.includes(cb.value);
  });

  // Hapus data lama sebelum disimpan ulang
  teams.splice(index, 1);
  localStorage.setItem("teams", JSON.stringify(teams));
  renderTeams();
}

// Fungsi tampilkan popup
function showPopup(message, color = "#4caf50") {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.background = color;
  popup.classList.add("show");

  // Hilang otomatis setelah 3 detik
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

function showDetail(index) {
  const team = teams[index];

  // Isi detail popup
  document.getElementById("detailName").textContent = team.name;
  document.getElementById("detailLogo").src = team.logo;
  document.getElementById("detailYear").textContent = 
    `Berdiri: ${team.startYear}${team.endYear ? " - " + team.endYear : ""}`;
  document.getElementById("detailDesc").textContent = team.desc;
  document.getElementById("detailCompetitions").textContent = team.competitions.join(", ");

  // Tampilkan popup
  document.getElementById("detailPopup").style.display = "block";
}

// Tutup popup
document.getElementById("closePopup").onclick = function () {
  document.getElementById("detailPopup").style.display = "none";
};

// Tutup jika klik luar area
window.onclick = function (event) {
  const popup = document.getElementById("detailPopup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};
