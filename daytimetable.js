(async () => {
  response = await fetch("db/getAllClass");
  let classArr = await response.json()
  let classEl = document.getElementById("class");
  for (var i = 0; i < classArr.length; i++) {
    let option = new Option(classArr[i], classArr[i]);
    classEl.appendChild(option);
  }
})();

