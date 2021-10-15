const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {},
  email: {},
  thoughts: [{}],
  friend: [{}],
});

const User = model("User", UserSchema);

module.exports = User;
