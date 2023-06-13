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
  buildTable(responseText, className, date);
  buildResults(responseText, className, date);

})();

function createHeading(className, date) {
  const classNameHeader = document.getElementById("className");
  classNameHeader.textContent = `Free slots of ${className} on ${date}`
}

function buildTable(freeSlotsArr) {
  let freeSlots = new Set(freeSlotsArr);
  const freeSlotTable = document.getElementById("freeSlotTable");
  const tr = freeSlotTable.insertRow();
  for (let i = 0; i < 8; i++) {
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(`Slot ${i + 1}`));
    if (freeSlots.has(i + 1)) {
      td.classList.add("table-success");
    } else {
      td.classList.add("table-danger");
    }
  }
}

function buildResults(freeSlotsArr, className, date) {
  let el = document.getElementById("freeSlotResult");
  for (let i = 0; i < freeSlotsArr.length; i++) {
    let child = createCard(className, date, freeSlotsArr[i]);
    el.appendChild(child);
  }
}

function createCard(className, date, slot) {
  let template = document.createElement("template");
  template.innerHTML = `
<div class="card mb-2">
    <div class="card-header">
    ${date.split("T")[0]}
  </div>
  <div class="card-body">
    <h5 class="card-title">Slot ${slot}
    <span class="card-subtitle mb-2 badge rounded-pill text-bg-primary">${className}</span></h5>
    <form action="/booking" method="GET">
    <input type="hidden" name="date" value="${date.split("T")[0]}">
    <input type="hidden" name="class" value="${className}">
    <input type="hidden" name="slot" value="${slot}">
    <button class="btn btn-outline-primary" type="submit">Book Now</a>
    </form>
  </div>
</div>`.trim();
  return template.content.firstChild;
}

