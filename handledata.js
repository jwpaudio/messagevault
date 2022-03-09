//Import some modules
const fs = require("fs");
const { generateID } = require("./generateid");

class HandleData {
  //Methods

  //Create new data object
  static createMessage(formData) {
    console.log(formData);
    let newId = generateID(5);
    this.saveMessageData(newId, formData);
    return newId;
  }

  //Save data to JSON
  static saveMessageData(id, formData) {
    let newMessageObject = {
      id: id,
      message: formData,
    };
    if (fs.readFileSync("./data/data.json").length === 0) {
      let fileArray = [];
      fileArray.push(newMessageObject);
      fs.writeFileSync("./data/data.json", JSON.stringify(fileArray));
    } else {
      let currentFile = JSON.parse(fs.readFileSync("./data/data.json"));
      currentFile.push(newMessageObject);
      fs.writeFileSync("./data/data.json", JSON.stringify(currentFile));
    }
  }
  // Read data from JSON
  static retrieveMessageData(messageId) {
    //Generate promise and process data
    return new Promise((resolve, reject) => {
      //Check to see if length is correct and format it
      console.log(messageId.length);
      if (messageId.length === 8) {
        //Format id
        messageId = messageId.substring(1, 7);
      } else reject(Error("Incorrect length!"));

      //Move on with data processing
      let currentFile = JSON.parse(fs.readFileSync("./data/data.json"));
      let searchFileResult = currentFile.find((item) => {
        if (item.id === messageId) return true;
      });
      if (searchFileResult !== undefined) {
        resolve(searchFileResult.message);
      } else {
        reject(Error("No result found!"));
      }
    });
  }
}

//Export class
module.exports.HandleData = HandleData;
