const db = require("../config/db");
const fs = require("fs");
const GroupUserSchema = require("../schemas/group-user");

// A list of groups usernames and emails of users,
// who are members of private groups
// joined the group in the November of 2021
// sort by group name ascending
// sort by username ascending
// and save the result to a csv file
const findAllUserInPrivateGroupAndExportAsCsv = async () => {
  const GroupUser = db.model("GroupUser", GroupUserSchema);

  const users = await GroupUser.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date("2021-11-01") },
      },
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupId",
        foreignField: "_id",
        as: "groups",
      },
    },
    {
      $unwind: "$groups",
    },
    {
      $match: {
        "groups.meta.isPrivate": true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    {
      $sort: {
        "groups.name": 1,
        "users.username": 1,
      },
    },
    {
      $project: {
        "groups.name": 1,
        "users.email": 1,
        "users.username": 1,
      },
    },
  ]);
  let csv = users
    .map((user) => {
      const { users, groups } = user;
      return `${groups.name},${users.username},${users.email}\n`;
    })
    .join("");
  csv = "Group Name,Username,Email\n" + csv;

  fs.writeFileSync("users-in-private-group.csv", csv);
  db.disconnect();
};

findAllUserInPrivateGroupAndExportAsCsv();
