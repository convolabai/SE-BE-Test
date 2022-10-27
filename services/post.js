const mongoose = require("mongoose");
const connectDB = require("../db/db");
const UserSchema = require("../schemas/user");
const GroupSchema = require("../schemas/group");
const GroupUserSchema = require("../schemas/group-user");

const PostUser = async () => {
  await connectDB();

  const User = mongoose.model("User", UserSchema);
  const Group = mongoose.model("Group", GroupSchema);
  const GroupUser = mongoose.model("GroupUser", GroupUserSchema);

  const group = await Group.create({
    createdAt: new Date(),
    meta: false,
    name: "Midnight",
    status: "active",
    updatedAt: new Date(),
  });

  const user1 = await User.create({
    createdAt: new Date(),
    email: "user1@email",
    updatedAt: new Date(),
    username: "taylor",
  });

  const user2 = await User.create({
    createdAt: new Date(),
    email: "user2@email",
    updatedAt: new Date(),
    username: "Swift",
  });

  const groupUser1 = await GroupUser.create({
    createdAt: new Date(),
    groupId: group._id,
    updatedAt: new Date(),
    userId: user1._id,
  });

  const groupUser2 = await GroupUser.create({
    createdAt: new Date(),
    groupId: group._id,
    updatedAt: new Date(),
    userId: user2._id,
  });

  // console.log("group : ", group);
  // console.log("user : ", user);
  // console.log("groupUser : ", groupUser);
};

PostUser();
