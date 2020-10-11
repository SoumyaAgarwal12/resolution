showRes();  //after loading page, Firstly show all my notes
// VALIDATION
function validation() {
    if (textareaId.value.length > 1)
        addRes();
    else
        showAlert();
}
// WARNING FOR BLANK INPUT
function showAlert() {
    let message = document.getElementById("message");

    message.innerHTML = `
  <div class="alert alert-danger" role="alert">
  <strong>Warning: </strong>Add your resolution.
  </div> `
    setTimeout(function () {
        message.innerHTML = ""
    }, 1500);
}
// ADD IN LOCALSTORAGE
function addRes() {
    var addTxt = document.getElementById("textareaId");
    // alert(addTxt)
    var getRes = localStorage.getItem("res");
    if (getRes == null) {
        resObj = [];
        //    console.log("notObj");
    }
    else {
        resObj = JSON.parse(getRes);
        //    console.log("getObj");
    }
    resObj.push(addTxt.value);
    localStorage.setItem("res", JSON.stringify(resObj));
    addTxt.value = " ";
    //    alert(addTxt)
    console.log(resObj);
    showRes();
}
// SHOW ON UI BY DOM
function showRes() {
    var addTxt = document.getElementById("textareaId");
    var getRes = localStorage.getItem("res");
    if (getRes == null) {
        resObj = [];
    }
    else {
        resObj = JSON.parse(getRes);
    }
    let html = "";
    resObj.forEach(myRes);
    function myRes(content, index) {
        html += `
        <div id="res1">
        <div class="displayRes">
           <h3 style="color:black";>Note ${index + 1} : </h3>
           <p id="para">${content}</p>
          <button id="${index}" onclick="deleteRes(this.id)">X</button>
          </div>
          </div>
          `
    }

    let resContent = document.getElementById("res");
    if (resObj.length != 0) {
        resContent.innerHTML = html;
    }
    else {
        resContent.innerHTML = `<div id="unfound">
        "No Resolution Found. Please Add from above section."
        </div>`
    }
}

// Delete Resolution
function deleteRes(index) {
    // var addTxt = document.getElementById("textareaId"); 
    var getRes = localStorage.getItem("res");
    if (getRes == null) {
        resObj = [];
        //    console.log("notObj");
    }
    else {
        resObj = JSON.parse(getRes);
        //    console.log("getObj");
    }

    resObj.splice(index, 1);
    localStorage.setItem("res", JSON.stringify(resObj));
    showRes();
}

// Search
var srch = document.getElementById("searchTxt");
srch.addEventListener("input", function () {

    var inputValue = srch.value.toLowerCase();
    console.log(inputValue);

    var resDisplay = document.getElementsByClassName("displayRes");
    // console.log(resDisplay)

    Array.from(resDisplay).forEach(function (element) {
        var z = element.getElementsByTagName("p")[0].innerHTML;
        console.log(z);

        if (z.toLowerCase().includes(inputValue)) {
            element.style.display = "grid";
        }
        else {
            element.style.display = "none";
        }
    })
})



