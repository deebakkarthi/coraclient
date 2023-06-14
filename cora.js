function renderHeader() {
  let header = document.getElementById("header")
  header.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">CORA</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav nav-tabs nav-fill" id="navLink">
      <li class="nav-item"><a id="homeNav" href="index.html" class="nav-link">Home</a></li>
      <li class="nav-item"><a id="slotNav" href="freeslot.html" class="nav-link">Free Slot</a></li>
      <li class="nav-item"><a id="multiSlotNav" href="multiFreeSlot.html" class="nav-link">Multi Free Slot</a></li>
      <li class="nav-item"><a id="classNav" href="freeclass.html" class="nav-link">Free Class</a></li>
      <li class="nav-item"><a id="timetableNav" href="daytimetable.html" class="nav-link">Class Timetable</a></li>
      <li class="nav-item"><a id="bookingNav" href="booking.html" class="nav-link">Booking</a></li>
      </ul>
    </div>
  </div>
</nav>
  `;
  let navLinkEl = document.getElementById("navLink");
  if (isLoggedIn()) {
    var template = document.createElement("template");
    template.innerHTML = `<li class="nav-item"><a id="profileNav" href="profile.html"
    class="nav-link">${sessionStorage.getItem("name")}</a></li>`;
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
