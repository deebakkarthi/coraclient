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
  }
})();
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

function expandDay(shortDay) {
  const dayMap = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday"
  }
  return dayMap[shortDay];
}

function buildTable(freeClassArr) {
  const freeSlotTable = document.getElementById("freeClassTable");
  for (let i = 0; i < freeClassArr.length; i++) {
    const tr = freeSlotTable.insertRow();
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(`${freeClassArr[i]}`));
    td.classList.add("table-info");
  }
}
