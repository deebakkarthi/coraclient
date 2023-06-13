(async () => {
  let getStarted = document.getElementById("getStarted");
  if (!sessionStorage.getItem("name")) {
    getStarted.innerHTML = ` <p class="getStarted">
        <a href="login.html" class="btn btn-lg btn-success fw-bold">Login to get Started</a>
      </p>`;
  }
})();
