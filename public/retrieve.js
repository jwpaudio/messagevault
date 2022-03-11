//Functions that need to be run on the clients browswer on the retrieve page

//Event listeners

//Event listener for retrieve submit button
const retrieveSubmit = document.getElementById("retrieveSubmit");
retrieveSubmit.addEventListener("click", handleRetrieve);

//Function to handle retrieve
function handleRetrieve() {
  const data = document.getElementById("uniqueCode").value;
  document.getElementById("uniqueCode").value = "";

  //Format as JSON
  let formDataObject = { formdata: "" };
  formDataObject.formdata = data;

  //Send data to server
  getData(`/retrieve_message/${JSON.stringify(formDataObject.formdata)}`)
    .then((response) => {
      //Set response element on page
      const responseElement = document.getElementById("retrieve-response");
      if (response.message === 400) {
        responseElement.innerHTML = `<h3 style="color: red">Invalid Code! Please try again.</h3>`;
      } else if (response.message === 404) {
        responseElement.innerHTML = `<h3 style="color: red">You didn't enter anything! Please try again.</h3>`;
      } else {
        responseElement.innerHTML = `<h3 style="color: green">VAULT UNLOCKED!</h3><h3>Your secret message was: </h3><span style="font-style: italic; font-size: 1em; font-weight: normal">${response.message}</span>`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//Function to get data
async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
