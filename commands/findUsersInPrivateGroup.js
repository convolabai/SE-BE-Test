const client = require('../database');

const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Group = require('../models/group');
const GroupUser = require('../models/group-user');

/**
 * @param {{ groupName: string, username: string, email: string }[]} data
 * @returns
 */
function toCsv(data) {
  const filename = `${new Date().toISOString()}.csv`;
  const filePath = path.resolve(__dirname, `../out/${filename}`);

  const header = 'Group Name,Username,Email';
  const rows = data.map(({ groupName, username, email, createdAt }) =>
    [groupName, username, email, createdAt].join(',')
  );

  return new Promise((resolve) => {
    fs.writeFile(filePath, [header, ...rows].join('\n'), () => {
      return resolve(filePath);
    });
  });
}

async function exec() {
  const privateGroupUsers = await GroupUser.aggregate([
    {
      $lookup: {
        from: User.collection.name,
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: Group.collection.name,
        localField: 'groupId',
        foreignField: '_id',
        as: 'group',
      },
    },
    {
      $match: {
        'group.meta.isPrivate': true,
        createdAt: {
          $gte: new Date('2021-11-01T00:00:00.000Z'),
          $lte: new Date('2021-11-30T23:59:59.999Z'),
        },
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $unwind: {
        path: '$group',
      },
    },
    {
      $sort: {
        'group.name': 1,
        'user.username': 1,
      },
    },
  ]).exec();

  const filePath = await toCsv(
    privateGroupUsers.map(({ user, group, createdAt }) => {
      return {
        groupName: group.name,
        username: user.username,
        email: user.email,
        createdAt: createdAt.toISOString(),
      };
    })
  );

  console.log(`The CSV File is generated at ${filePath}`);

  await client.disconnect();
}

exec();
