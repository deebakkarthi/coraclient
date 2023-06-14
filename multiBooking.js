function getDate() {
  let date = new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset * 60 * 1000))
  date = date.toISOString().split("T")[0]
  return date
}

function isEmptyObject(obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
}

function hasURLParams() {
  const URLParams = Object.fromEntries(new URLSearchParams(window.location.search));
  return !(isEmptyObject(URLParams))
}


(async () => {
  /* Check if a user is logged in
    * If not redirect them to login
    */
  let mail = sessionStorage.getItem("mail");
  if (mail) {
    let facultyEl = document.getElementById("faculty");
    facultyEl.value = sessionStorage.getItem("mail");
  } else {
    window.location.replace("login");
  }
  /*
  let response = await fetch("db/getAllSlot");
  let slot = await response.json()
  for (var i = 0; i < slot.length; i++) {
    let option = new Option(slot[i], slot[i]);
    slotEl.appendChild(option);
  }

  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  for (var i = 0; i < classArr.length; i++) {
    let option = new Option(classArr[i], classArr[i]);
    classEl.appendChild(option);
  }
  */

  let startSlotEl = document.getElementById("startSlot");
  let endSlotEl = document.getElementById("endSlot");
  let classEl = document.getElementById("class");
  let dateEl = document.getElementById("date");
  let subjectEl = document.getElementById("subject");

  response = await fetch("db/getAllSubject");
  let subject = await response.json()
  for (var i = 0; i < subject.length; i++) {
    let option = new Option(subject[i], subject[i]);
    subjectEl.appendChild(option);
  }
  if (hasURLParams()) {
    const URLParams = Object.fromEntries(new URLSearchParams(window.location.search));
    dateEl.value = URLParams.date;
    classEl.value = URLParams.class;
    startSlotEl.value = URLParams.startSlot;
    endSlotEl.value = URLParams.endSlot;
  } else {
    dateEl.value = date;
  }
  return;
})();

