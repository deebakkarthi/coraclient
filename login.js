(async () => {
  let loginForm = document.getElementById("loginForm");
  if (sessionStorage.getItem("mail")) {
    loginForm.innerHTML = `
    <div class="row">
      <h1>You are already logged in</h1>
      </div>
    <div class="row mt-4">
      <a class="btn btn-primary" href="#" onclick="logout()">Signout</a>
      </div>
    `
  } else {
    loginForm.innerHTML = `    <div class="row">
      <h1>Welcome to CORA</h1>
    </div>
    <div class="row">
      <span>Please sign in using your university Microsoft account</span>
    </div>
    <div class="row mt-4">
      <a class="btn btn-primary" href="oauth/login">Sign in with Microsoft</a>
    </div>
  </div>
`
  }
})();

function logout() {
  sessionStorage.clear();
  location.reload();
}
