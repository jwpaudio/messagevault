//Functions that need to be run on the clients browswer on the main page

//Import some modules

//Add event listeners

//Event listener for main submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmit);

//Function to handle submit
function handleSubmit() {
  console.log("I've been clicked!");
  const data = document.getElementById("secretMessage").value;
  document.getElementById("secretMessage").value = "";

  //Format as JSON
  let formDataObject = { formdata: "" };
  formDataObject.formdata = data;

  console.log(JSON.stringify(formDataObject));

  //Send data to server
  postData("./secret_message", formDataObject)
    .then((response) => {
      console.log(response);
      //Set response element on page
      const responseElement = document.getElementById("response");
      if (response.response === "Empty") {
        responseElement.innerText =
          "SERVER RESPONSE:  You didn't enter anything, try again.";
      } else {
        responseElement.innerHTML = `<span style='color: green'>SERVER RESPONSE: Success!</span><br /><br /><span>Your secret code is: <h2 style='color: red'>${response.id}</h2></span>`;
      }
    })
    .catch((error) => {
      return console.error(error);
    });
}

//Function to post data
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
