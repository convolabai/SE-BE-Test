const db = require("../config/db");
const UserSchema = require("../schemas/user");
const GroupSchema = require("../schemas/group");
const GroupUserSchema = require("../schemas/group-user");

const initDb = async () => {
  const User = db.model("User", UserSchema);
  const Group = db.model("Group", GroupSchema);
  const GroupUser = db.model("GroupUser", GroupUserSchema);

  // clear all data
  await User.deleteMany({});
  await Group.deleteMany({});
  await GroupUser.deleteMany({});

  console.log("All data cleared");

  console.log("Creating Documents");

  const group = await Group.create([
    {
      name: "Group 1 Private",
      status: "active",
      meta: {
        isPrivate: true,
      },
    },
    {
      name: "Group 2 Private",
      status: "active",
      meta: {
        isPrivate: true,
      },
    },
    {
      name: "Group 3 Public",
      status: "active",
      meta: {
        isPrivate: false,
      },
    },
  ]);


  const users = await User.create([
    {
      email: "userPrivate1@email.com",
      username: "james",
    },
    {
      email: "userPrivate2@email.com",
      username: "alex",
    },
    {
      email: "userPrivate3@email.com",
      username: "john",
    },
    {
      email: "userPublic@email.com",
      username: "jane",
    },
  ]);

  await GroupUser.create([
    {
      groupId: group[1]._id,
      userId: users[0]._id,
      createdAt : new Date("2021-11-01"),
    },
    {
      groupId: group[1]._id,
      userId: users[1]._id,
      createdAt : new Date("2021-11-01"),
    },
    {
      groupId: group[0]._id,
      userId: users[1]._id,
      createdAt : new Date("2021-10-01"),
    },
    {
      groupId: group[0]._id,
      userId: users[2]._id,
      createdAt : new Date("2021-11-01"),
    },
    {
      groupId: group[1]._id,
      userId: users[2]._id,
      createdAt : new Date("2021-11-01"),
    },
    {
      groupId: group[2]._id,
      userId: users[3]._id,
      createdAt : new Date("2021-11-01"),
    },
  ]);

  db.disconnect();
  console.log("Documents created");
};

initDb();
