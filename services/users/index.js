const getPermissionUsersData = arrayOfUsers =>
  arrayOfUsers.map(
    ({
      username,
      firstName,
      surName,
      middleName,
      img,
      permission,
      _id: id
    }) => ({
      username,
      firstName,
      surName,
      middleName,
      id
    })
  );

module.exports = {
  getPermissionUsersData
};
