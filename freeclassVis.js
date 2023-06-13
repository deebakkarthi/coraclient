(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/freeclass"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get("date");
  const slot = urlParams.get("slot");
  console.log(targetURL);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  console.log(responseText);
  if (responseText === null) {
    noFreeClassHeading(date, slot);
  } else {
    createHeading(date, slot);
    buildTable(responseText);
    buildResults(slot, responseText, date);
  }
})();

function buildResults(slot, classNameArr, date) {
  let el = document.getElementById("freeClassResult");
  for (let i = 0; i < classNameArr.length; i++) {
    let child = createCard(classNameArr[i], date, slot);
    el.appendChild(child);
  }
}

function noFreeClassHeading(date, slot) {
  const classNameHeader = document.getElementById("freeClassHeader");
  classNameHeader.classList.add("alert");
  classNameHeader.classList.add("alert-danger");
  classNameHeader.textContent = `No free classes  on ${date} slot ${slot}`
}

function createHeading(date, slot) {
  const classNameHeader = document.getElementById("freeClassHeader");
  classNameHeader.textContent = `Free classes  on ${date} slot ${slot}`
}
async function buildTable(freeClassArr) {
  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  let cSet = new Set(freeClassArr)
  const freeClassTable = document.getElementById("freeClassTable");
  const tr = freeClassTable.insertRow();
  for (let i = 0; i < classArr.length; i++) {
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(`${classArr[i]}`));
    if (cSet.has(classArr[i])) {
      td.classList.add("table-success");
    } else {
      td.classList.add("table-danger");
    }
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
    <h5 class="card-title">${className}
    <span class="card-subtitle mb-2 badge rounded-pill text-bg-primary">Slot ${slot}</span></h5>
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
