(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/booking"
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
  const el = document.getElementById("bookingResult");
  el.classList.add("alert")
  el.classList.add("alert-danger");
  el.textContent = "That slot is already booked. Choose another"
}

function success(params) {
  const el = document.getElementById("bookingResult");
  el.classList.add("alert")
  el.classList.add("alert-success");
  el.textContent = `Successfully booked slot ${params.slot} on ${params.date} in class ${params.class}
  for ${params.subject}`;
}
