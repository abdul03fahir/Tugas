document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectContainer");

  // Ambil data dari localStorage
  const teams = JSON.parse(localStorage.getItem("teams")) || [];

  // Ambil index dari query string
  const urlParams = new URLSearchParams(window.location.search);
  const teamIndex = urlParams.get("index");

  // Callback function untuk render detail
  function renderProject(callback) {
    if (teamIndex !== null && teams[teamIndex]) {
      const team = teams[teamIndex];
      const teamName = team.name.toLowerCase();

      if (teamName === "persija jakarta") {
        container.innerHTML = `
          <h1 class="title">${team.name}</h1>
          <section class="project-content">
            <div class="project-image">
              <img src="${team.logo}" alt="Logo ${team.name}" />
            </div>
            <div class="project-details">
              <h3>Duration</h3>
              <p>📅 28 Nov 1928 - Sekarang</p>
              <p>⏳ 97 Tahun</p>

              <h3>Technologies</h3>
              <div class="tech-list">
                <span class="tech">⚛ React Js</span>
                <span class="tech">🟨 JavaScript</span>
                <span class="tech">🟢 Node Js</span>
                <span class="tech">🔗 Socket IO</span>
              </div>
            </div>
          </section>

          <section class="description">
            <h3>Deskripsi Klub</h3>
            <p>
              Persija Jakarta adalah klub sepak bola profesional asal Jakarta, Indonesia, 
              yang didirikan pada 28 November 1928. Klub ini dikenal dengan julukan 
              <strong>Macan Kemayoran</strong>, mewakili semangat perlawanan dan kebanggaan ibu kota.
            </p>
            <p>
              Persija adalah salah satu klub sepak bola tersukses di Indonesia dengan 11 gelar juara liga 
              dan belum pernah terdegradasi. Klub ini memiliki basis penggemar fanatik bernama 
              <em>The Jakmania</em>.
            </p>
          </section>

          <button id="backBtn" class="btn-back">⬅ Kembali ke Home</button>
        `;
      } else {
        container.innerHTML = `
          <h1 class="title">${team.name}</h1>
          <section class="description">
            <p>Detail untuk <strong>${team.name}</strong> belum tersedia.</p>
          </section>
          <button id="backBtn" class="btn-back">⬅ Kembali ke Home</button>
        `;
      }

      // Event listener tombol kembali
      document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href = "Home.html";
      });

      // panggil callback jika ada
      if (typeof callback === "function") {
        callback(team);
      }
    } else {
      container.innerHTML = `
        <h1 class="title">Tidak ada data tim</h1>
        <p>Silakan pilih tim terlebih dahulu.</p>
        <button id="backBtn" class="btn-back">⬅ Kembali ke Home</button>
      `;

      document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href = "Home.html";
      });
    }
  }

  // Jalankan renderProject dengan callback
  renderProject((team) => {
    console.log("Detail tim berhasil ditampilkan:", team.name);
  });
});
