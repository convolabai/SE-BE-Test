const client = require('../database');

const User = require('../models/user');

/**
 * Capitalize the given `str`
 * @param {string} str
 * @returns
 */
function capitalize(str) {
  if (str.length === 0) {
    return str;
  } else if (str.length === 1) {
    return str.toUpperCase();
  }
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

async function exec() {
  const users = await User.find();

  const updatedUsers = users.map((user) => {
    return {
      _id: user._id,
      username: capitalize(user.username),
    };
  });

  await User.bulkWrite(
    updatedUsers.map(({ _id, username }) => {
      return {
        updateOne: {
          filter: { _id },
          update: { username },
        },
      };
    })
  );

  console.log(`Capitalized all usernames`);

  await client.disconnect();
}

exec();
