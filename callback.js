(async () => {
  const baseURL = window.location.protocol + "//" + window.location.host;
  const path = "/oauth/exchange"
  const queryString = window.location.search;
  const targetURL = baseURL + path + queryString;
  const loginStatusDiv = document.getElementById("loginStatus");

  let response = await fetch(targetURL);
  let responseText = await response.text();
  if (!response.ok) {
    loginStatusDiv.innerHTML = "Login Failed\n" + responseText;
    return;
  } else {
    let responseJSON = JSON.parse(responseText)
    sessionStorage.setItem("mail", responseJSON["mail"]);
    sessionStorage.setItem("name", responseJSON["name"]);
    sessionStorage.setItem("organization", responseJSON["organization"]);
    loginStatusDiv.textContent = `You are logged in as ${responseJSON["name"]}
  [${responseJSON["mail"]}] from ${responseJSON["organization"]}`;
  }
  window.location.replace("index.html");
})();
