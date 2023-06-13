(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/freeslot"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const urlParams = new URLSearchParams(window.location.search);
  const className = urlParams.get("class");
  const date = urlParams.get("date");
  console.log(targetURL);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  createHeading(className, date);
  buildTable(responseText);
})();

function createHeading(className, date) {
  const classNameHeader = document.getElementById("className");
  classNameHeader.textContent = `Free slots of ${className} on ${date}`
}

function buildTable(freeSlotsArr) {
  let freeSlots = new Set(freeSlotsArr);
  const freeSlotTable = document.getElementById("freeSlotTable");
  for (let i = 0; i < 8; i++) {
    const tr = freeSlotTable.insertRow();
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(`Slot ${i + 1}`));
    if (freeSlots.has(i + 1)) {
      td.classList.add("table-success");
    } else {
      td.classList.add("table-danger");
    }
  }
}
