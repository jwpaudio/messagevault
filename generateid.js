//Generate a random ID
function generateID(length) {
  let generatedId = Date.now().toString(16).substring(length);
  return generatedId;
}

exports.generateID = generateID;
