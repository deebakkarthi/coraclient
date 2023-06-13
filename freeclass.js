(async () => {
  if (!sessionStorage.getItem("mail")) {
    window.location.replace("login");
  }

  let response = await fetch("db/getAllSlot");
  let slot = await response.json()
  let slotEl = document.getElementById("slot");
  for (var i = 0; i < slot.length; i++) {
    let option = new Option(slot[i], slot[i]);
    slotEl.appendChild(option);
  }
})();
