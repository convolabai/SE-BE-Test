const db = require("../config/db");
const UserSchema = require("../schemas/user");

// Update all users' username to pascal case
const updateUsernameToCapitalizingFirstLetter = async () => {
  const User = db.model("User", UserSchema);

  const users = await User.find({});

  for (const user of users) {
    const word = user.username;
    user.username =  word[0].toUpperCase() + word.slice(1);
    await user.save();
  }

  db.disconnect();
};

updateUsernameToCapitalizingFirstLetter();
