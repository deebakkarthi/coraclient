function getDate() {
  let date = new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset * 60 * 1000))
  date = date.toISOString().split("T")[0]
  return date
}

(async () => {
  if (!sessionStorage.getItem("mail")) {
    window.location.replace("login");
  }
  let datePicker = document.getElementById("date");
  let date = getDate();
  datePicker.value = date;
  datePicker.min = date;

  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  let classEl = document.getElementById("class");
  for (var i = 0; i < classArr.length; i++) {
    let option = new Option(classArr[i], classArr[i]);
    classEl.appendChild(option);
  }
})();

