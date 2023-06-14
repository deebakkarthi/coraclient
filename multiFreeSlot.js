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

  let startSlotEl = document.getElementById("startSlot");
  let endSlotEl = document.getElementById("endSlot");

  // Don't select anything
  // The firstChild is automatically selected
  startSlotEl.value = "";
  endSlotEl.value = "";
  // Don't include the last slot
  for (var i = 0; i < slot.length - 1; i++) {
    let option = new Option(slot[i], slot[i]);
    startSlotEl.appendChild(option);
  }
  startSlotEl.addEventListener("change", function() {
    let val = parseInt(this.value, 10);
    console.log(val);
    while (endSlotEl.hasChildNodes()) {
      endSlotEl.removeChild(endSlotEl.firstChild);
    }
    // start i with val and use it to index the OG slot array
    // this enables to have arbitary slot values 
    for (var i = val; i < slot.length; i++) {
      let option = new Option(slot[i], slot[i]);
      endSlotEl.appendChild(option);
    }
  });
})();

