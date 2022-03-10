const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const { HandleData } = require("./handledata.js");

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

app.use(express.json());

//Routes
app.post("/secret_message", (req, res) => {
  if (req.body.formdata) {
    let newId = HandleData.createMessage(req.body.formdata);
    res.status(200).json({ response: "Success", id: newId });
  } else
    res.status(404).json({
      response: "Empty",
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/retrieve", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/retrieve.html"));
});

app.get("/retrieve_message/:id", (req, res) => {
  //Send for data processing
  if (req.params.id.length > 2) {
    HandleData.retrieveMessageData(req.params.id)
      .then((response) => {
        //Send successful response
        res.status(200).json({ message: response });
      })
      //Catch didn't find message in file error
      .catch((error) => {
        console.error(error);
        res.status(400).json({ message: 400 });
      });
    //Send back empty request error
  } else {
    res.status(404).json({ message: 404 });
  }
});
