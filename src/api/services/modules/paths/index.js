/// func to create the path to refresh pair
module.exports.getRefreshPath = () => `http://localhost:${process.env.SERVER_PORT}/auth/refresh`;
