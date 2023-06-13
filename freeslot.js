(async () => {
  /* Check if a user is logged in
    * If not redirect them to login
    */
  if (!sessionStorage.getItem("mail")) {
    window.location.replace("login");
  }
  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  let classEl = document.getElementById("class");
  console.log(classArr)
  for (var i = 0; i < classArr.length; i++) {
    let option = new Option(classArr[i], classArr[i]);
    classEl.appendChild(option);
  }
  return;
})();

