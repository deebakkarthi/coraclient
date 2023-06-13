(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/freeclass"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const urlParams = new URLSearchParams(window.location.search);
  const day = urlParams.get('day');
  const slot = urlParams.get("slot");
  console.log(targetURL);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  createHeading(day, slot);
  console.log(responseText);
  buildTable(responseText);
})();

function createHeading(day, slot) {
  const classNameHeader = document.getElementById("freeClassHeader");
  classNameHeader.textContent = `Free classes  on ${expandDay(day)} slot ${slot}`
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
