function getDate() {
  let date = new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset * 60 * 1000))
  date = date.toISOString().split("T")[0]
  return date
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

  let response = await fetch("db/getAllSlot");
  let slot = await response.json()
  let slotEl = document.getElementById("slot");
  for (var i = 0; i < slot.length; i++) {
    let option = new Option(slot[i], slot[i]);
    slotEl.appendChild(option);
  }

  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  let classEl = document.getElementById("class");
  for (var i = 0; i < classArr.length; i++) {
    let option = new Option(classArr[i], classArr[i]);
    classEl.appendChild(option);
  }

  response = await fetch("db/getAllSubject");
  let subject = await response.json()
  let subjectEl = document.getElementById("subject");
  for (var i = 0; i < subject.length; i++) {
    let option = new Option(subject[i], subject[i]);
    subjectEl.appendChild(option);
  }
  const date = getDate();
  let dateEl = document.getElementById("date");
  dateEl.min = date;
  dateEl.value = date;
  return;
})();

