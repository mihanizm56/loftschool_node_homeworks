const photoValidation = (name, size) =>
  new Promise((resolve, reject) => {
    name && size ? resolve() : reject();
  });

module.exports = {
  photoValidation
};
