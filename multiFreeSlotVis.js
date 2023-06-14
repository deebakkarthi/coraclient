(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/multiFreeSlot"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const urlParams = new URLSearchParams(window.location.search);
  const startSlot = urlParams.get("startSlot");
  const endSlot = urlParams.get("endSlot");
  const date = urlParams.get("date");
  console.log(targetURL);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  console.log(responseText)
  if (responseText != null) {
    createHeading(startSlot, endSlot, date);
    buildTable(responseText);
    buildResults(responseText, startSlot, endSlot, date);
  } else {
    noFreeClassHeading(startSlot, endSlot, date);
  }
})();


function noFreeClassHeading(startSlot, endSlot, date) {
  const multiFreeSlotHeader = document.getElementById("multiFreeSlotHeader");
  multiFreeSlotHeader.classList.add("alert");
  multiFreeSlotHeader.classList.add("alert-danger");
  multiFreeSlotHeader.textContent = `No such classes  that are free from slot ${startSlot} to slot ${endSlot} on ${date}`;
}


function createHeading(startSlot, endSlot, date) {
  const multiFreeSlotHeader = document.getElementById("multiFreeSlotHeader");
  multiFreeSlotHeader.innerHTML = `<h1>Classes with free slots from slot ${startSlot} to slot ${endSlot} on ${date}</h1>`
}

async function buildTable(freeClassArr) {
  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  let cSet = new Set(freeClassArr)
  const el = document.getElementById("multiFreeSlotTable");
  const tr = el.insertRow();
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

function buildResults(freeClassArr, startSlot, endSlot, date) {
  let el = document.getElementById("multiFreeSlotResult");
  for (let i = 0; i < freeClassArr.length; i++) {
    let child = createCard(freeClassArr[i], startSlot, endSlot, date);
    el.appendChild(child);
  }
}

function createCard(className, startSlot, endSlot, date) {
  let template = document.createElement("template");
  template.innerHTML = `
<div class="card mb-2">
    <div class="card-header">
    ${date.split("T")[0]}
  </div>
  <div class="card-body">
    <h5 class="card-title">${className}
    <span class="card-subtitle mb-2 badge rounded-pill text-bg-primary">Slot ${startSlot} to ${endSlot}</span></h5>
    <form action="/multiBooking" method="GET">
    <input type="hidden" name="date" value="${date.split("T")[0]}">
    <input type="hidden" name="class" value="${className}">
    <input type="hidden" name="startSlot" value="${startSlot}">
    <input type="hidden" name="endSlot" value="${endSlot}">
    <button class="btn btn-outline-primary" type="submit">Book Now</a>
    </form>
  </div>
</div>`.trim();
  return template.content.firstChild;
}

