// @desc Logs request to console
const logger = (req, res, next) => {
  const { protocol, originalUrl, method } = req;
  console.log(`${method} ${protocol}://${req.get("host")}${originalUrl}`);

  next();
};

module.exports = logger;
