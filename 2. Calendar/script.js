const BASE_DATE = new Date("2025-01-01");
const TOTAL_YEARS = 80;

const views = {
  weeks: { unitsPerYear: 52, addFn: d => d.setDate(d.getDate() + 7) },
  months: { unitsPerYear: 12, addFn: d => d.setMonth(d.getMonth() + 1) },
  years: { unitsPerYear: 1, addFn: d => d.setFullYear(d.getFullYear() + 1) }
};

let currentView = "weeks";

function setView(view) {
  currentView = view;
  document.querySelectorAll(".view-switch button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  generateLife();
}

function generateLife() {
  const dobValue = document.getElementById("dob").value;
  if (!dobValue) return;

  const dob = new Date(dobValue);
  const today = new Date();

  const container = document.getElementById("life-container");
  const stats = document.getElementById("stats");
  container.innerHTML = "";

  const { unitsPerYear, addFn } = views[currentView];

  let cursorDate = new Date(dob);
  let livedUnits = 0;

  while (cursorDate < today) {
    livedUnits++;
    addFn(cursorDate);
  }

  const totalUnits = TOTAL_YEARS * unitsPerYear;
  const percent = ((livedUnits / totalUnits) * 100).toFixed(1);

  stats.innerHTML = `
    You are in <b>Year ${Math.floor(livedUnits / unitsPerYear) + 1}</b> of 80 • 
    <b>${percent}%</b> lived
  `;

  cursorDate = new Date(dob);

  for (let year = 1; year <= TOTAL_YEARS; year++) {
    const row = document.createElement("div");
    row.className = "year-row";

    const label = document.createElement("div");
    label.className = "year-label";
    label.textContent = `Year ${year}`;

    const grid = document.createElement("div");
    grid.className = "unit-grid";
    grid.style.gridTemplateColumns = `repeat(${unitsPerYear}, 14px)`;

    for (let u = 1; u <= unitsPerYear; u++) {
      const unit = document.createElement("div");
      unit.className = "unit";

      if ((year - 1) * unitsPerYear + (u - 1) < livedUnits)
        unit.classList.add("lived");
      else if ((year - 1) * unitsPerYear + (u - 1) === livedUnits)
        unit.classList.add("current");

      if (
        cursorDate.getDate() === dob.getDate() &&
        cursorDate.getMonth() === dob.getMonth()
      ) {
        unit.classList.add("birthday");
      }

      unit.dataset.tooltip = `
        Year ${year} • ${currentView.slice(0, -1)} ${u}
        (${cursorDate.toDateString()})
      `;

      addFn(cursorDate);
      grid.appendChild(unit);
    }

    row.appendChild(label);
    row.appendChild(grid);
    container.appendChild(row);
  }
}
