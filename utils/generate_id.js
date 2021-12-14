const randomId = () => {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    var random_id = "";
    var date = Date.now().toString();
    for (var i = 0; i < characters.length; i++) {
      random_id += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // return cryptr.encrypt(random_id+date);
    return random_id + date;
  };
  
  module.exports = randomId;