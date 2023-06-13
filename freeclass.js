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


  let response = await fetch("db/getAllSlot");
  let slot = await response.json()
  let slotEl = document.getElementById("slot");
  for (var i = 0; i < slot.length; i++) {
    let option = new Option(slot[i], slot[i]);
    slotEl.appendChild(option);
  }
})();
