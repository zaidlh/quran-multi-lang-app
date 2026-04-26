const API_BASE = "https://api.alquran.cloud/v1";

document.getElementById("lookup").addEventListener("click", lookup);
document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") lookup();
});

async function lookup() {
  const input = document.getElementById("search").value.trim();
  const resultDiv = document.getElementById("result");

  if (!input) return;

  const match = input.match(/^(\d+):(\d+)$/);
  if (!match) {
    resultDiv.innerHTML = '<p class="empty">Format: surah:ayah (e.g. 2:255)</p>';
    return;
  }

  const [, surah, ayah] = match;
  resultDiv.innerHTML = '<p class="empty">Loading...</p>';

  try {
    const [arRes, enRes] = await Promise.all([
      fetch(`${API_BASE}/ayah/${surah}:${ayah}`),
      fetch(`${API_BASE}/ayah/${surah}:${ayah}/en.sahih`),
    ]);

    const arData = await arRes.json();
    const enData = await enRes.json();

    if (arData.code !== 200) {
      resultDiv.innerHTML = '<p class="empty">Verse not found</p>';
      return;
    }

    if (enData.code !== 200) {
      resultDiv.innerHTML = '<p class="empty">Translation not available for this verse</p>';
      return;
    }

    resultDiv.textContent = "";

    const arDiv = document.createElement("div");
    arDiv.className = "result";
    arDiv.textContent = arData.data.text;

    const transDiv = document.createElement("div");
    transDiv.className = "translation";
    transDiv.textContent = enData.data.text;

    const refDiv = document.createElement("div");
    refDiv.className = "reference";
    refDiv.textContent = `${arData.data.surah.englishName} (${arData.data.surah.name}) — Verse ${ayah}`;

    resultDiv.append(arDiv, transDiv, refDiv);
  } catch {
    resultDiv.innerHTML = '<p class="empty">Failed to fetch verse. Check your connection.</p>';
  }
}
