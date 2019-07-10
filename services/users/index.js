const getPermissionUsersData = arrayOfUsers =>
  arrayOfUsers.map(
    ({
      username,
      firstName,
      surName,
      middleName,
      image,
      permission,
      _id: id
    }) => ({
      username,
      firstName,
      surName,
      image,
      middleName,
      id
    })
  );

module.exports = {
  getPermissionUsersData
};
