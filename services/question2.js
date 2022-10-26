const mongoose = require("mongoose");
const connectDB = require("../db/db");
const UserSchema = require("../schemas/user");

const UpdateCapitalUsername = async () => {
  // connect with database
  await connectDB();

  // declare schema as model
  const User = mongoose.model("User", UserSchema);

  // find all user for update their username
  const users = await User.find();

  // let's capitalize their username
  await Promise.all(
    users.map(async (user) => {
      let username = user.username;
      let capitalizeUsername =
        username.charAt(0).toUpperCase() + username.slice(1);
      await User.findByIdAndUpdate(user._id, {
        username: capitalizeUsername,
      });
    })
  );
};

UpdateCapitalUsername();
