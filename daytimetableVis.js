(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/daytimetable"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const urlParams = new URLSearchParams(window.location.search);
  const className = urlParams.get("class");
  const date = urlParams.get("date");
  console.log(targetURL);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  createHeading(className, date);
  console.log(responseText);
  buildTable(responseText);
})();

function createHeading(className, date) {
  const classNameHeader = document.getElementById("timetableHeader");
  classNameHeader.textContent = `Timetable of ${className} on ${date}`;
}

function buildTable(subjectArr) {
  const freeSlotTable = document.getElementById("timetable");
  for (let i = 0; i < subjectArr.length; i++) {
    const tr = freeSlotTable.insertRow();
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(`${subjectArr[i]}`));
    if (subjectArr[i] == "FREE") {
      td.classList.add("table-success");
    } else {
      td.classList.add("table-secondary");
    }
  }
}

