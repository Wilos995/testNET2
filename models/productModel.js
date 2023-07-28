const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  adress: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
