function renderHeader() {
  let header = document.getElementById("header")
  header.classList.add("d-flex", "flex-wrap", "justify-content-center", "py-3", "mb-4", "border-bottom")
  header.innerHTML = `<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg class="bi me-2" width="40" height="32">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-4">CORA</span>
    </a>
    <div>
    <ul class="nav nav-pills" id="navLink">
      <li class="nav-item"><a id="homeNav" href="index.html" class="nav-link">Home</a></li>
      <li class="nav-item"><a id="slotNav" href="freeslot.html" class="nav-link">Free Slot</a></li>
      <li class="nav-item"><a id="classNav" href="freeclass.html" class="nav-link">Free Class</a></li>
      <li class="nav-item"><a id="timetableNav" href="daytimetable.html" class="nav-link">Class Timetable</a></li>
      <li class="nav-item"><a id="bookingNav" href="booking.html" class="nav-link">Booking</a></li>
    </ul>
    </div>`;
  let navLinkEl = document.getElementById("navLink");
  if (isLoggedIn()) {
    var template = document.createElement("template");
    template.innerHTML = `<li class="nav-item"><a id="profileNav" href="profile.html" class="nav-link">${sessionStorage.getItem("name")}</a></li>`;
    navLinkEl.appendChild(template.content.firstChild);
  } else {
    var template = document.createElement("template");
    template.innerHTML = `<li class="nav-item"><a id="loginNav" href="login.html" class="nav-link">Login</a></li>`;
    navLinkEl.appendChild(template.content.firstChild);
  }
}


function isLoggedIn() {
  return Boolean(sessionStorage.getItem("mail"));
}
