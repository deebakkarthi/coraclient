(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/db/getBooking"
  const queryString = "?" + new URLSearchParams({ faculty: sessionStorage.getItem("mail") }).toString()
  const targetURL = baseURL + path + queryString;
  let response = await fetch(targetURL);
  let responseText = await response.json();
  let el = document.getElementById("bookingResult");
  if (responseText === null) {
    noBookingHeading();
  } else {
    const bookingHeader = document.getElementById("bookingHeader");
    bookingHeader.innerHTML = "<h1>Your Bookings</h1>"
    for (let i = 0; i < responseText.length; i++) {
      let tmp = responseText[i];
      let child = createCard(tmp.class, tmp.date, tmp.faculty, tmp.slot, tmp.subject)
      el.appendChild(child);
    }
  }
}
)();

function createCard(className, date, faculty, slot, subject) {
  let template = document.createElement("template");
  template.innerHTML = `
<div class="card mb-2">
  <div class="card-body">
    <h5 class="card-title">Slot ${slot} on ${date.split("T")[0]}</h5>
    <hr/>
    <h6 class="card-subtitle mb-2 badge rounded-pill text-bg-primary">${subject}</h6>
    <p class="card-text">${className}</p>
    <form action="/db/cancelBooking" method="GET">
    <input type="hidden" name="date" value="${date.split("T")[0]}">
    <input type="hidden" name="class" value="${className}">
    <input type="hidden" name="slot" value="${slot}">
    <button href="/db/cancelBooking" class="btn btn-outline-danger" type="submit">Cancel</a>
    </form>
  </div>
</div>`.trim();
  return template.content.firstChild;
}

function noBookingHeading() {
  const bookingHeader = document.getElementById("bookingHeader");
  bookingHeader.classList.add("alert");
  bookingHeader.classList.add("alert-danger");
  bookingHeader.textContent = "You have not booked anything";
}
