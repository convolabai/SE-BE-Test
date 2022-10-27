const mongoose = require("mongoose");
const fs = require("fs");
const connectDB = require("../db/db");
const GroupUserSchema = require("../schemas/group-user");

const ExportCsv = async () => {
  // connect with database
  await connectDB();

  // declare schema as model
  const GroupUser = mongoose.model("GroupUser", GroupUserSchema);

  // declare csv header => Group Name,Username,Email
  const exportObject = ["Group Name,Username,Email"];

  // find all GroupUser for get user object and group object, also sort order by groupId.name then userId.username
  const groupUsers = await GroupUser.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userId",
      },
    },
    { $unwind: { path: "$userId" } },
    {
      $lookup: {
        from: "groups",
        localField: "groupId",
        foreignField: "_id",
        as: "groupId",
      },
    },
    { $unwind: { path: "$groupId" } },
  ]).sort({ "groupId.name": 1, "userId.username": 1 });

  await Promise.all(
    groupUsers.map(async (item) => {
      // push a row record
      exportObject.push(
        `${item.groupId.name},${item.userId.username},${item.userId.email}`
      );
    })
  );

  // join array by \n will get new line in every rows
  const dataCsv = exportObject.join("\n");
  const fileName = `data-${Date.now()}.csv`;
  fs.writeFile(fileName, dataCsv, "utf-8", (err) => {
    if (err) console.log(err);
    else console.log(`saved name : ${fileName}`);
  });
};

ExportCsv();
