(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/daytimetable"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const urlParams = new URLSearchParams(window.location.search);
  const className = urlParams.get("class");
  const day = urlParams.get("day");
  console.log(targetURL);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  createHeading(className, day);
  console.log(responseText);
  buildTable(responseText);
})();

function createHeading(className, day) {
  const classNameHeader = document.getElementById("timetableHeader");
  classNameHeader.textContent = `Timetable of ${className} on ${expandDay(day)}`;
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

