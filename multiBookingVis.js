(async () => {
  /* Check if a user is logged in
  * If not redirect them to login
  */
  if (!sessionStorage.getItem("mail")) {
    window.location.replace("login");
  }

  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/multiBooking"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const params = Object.fromEntries(
    new URLSearchParams(window.location.search)
  )
  console.log(targetURL);
  console.log(params);

  let response = await fetch(targetURL);
  let responseText = await response.json();
  console.log(responseText)
  if (responseText.inserted === true) {
    success(params);
  } else {
    failure();
  }
}
)();

function failure() {
  const el = document.getElementById("multiBookingResult");
  el.classList.add("alert")
  el.classList.add("alert-danger");
  el.textContent = "That slot is already booked. Choose another"
}

function success(params) {
  const el = document.getElementById("multiBookingResult");
  el.classList.add("alert")
  el.classList.add("alert-success");
  el.textContent = `Successfully booked slots ${params.startSlot} through ${params.endSlot} in class ${params.class}
  for ${params.subject}`;
}
