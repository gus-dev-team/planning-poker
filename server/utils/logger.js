const logger = function (req, res, next) {
  const time = new Date().toLocaleString();
  console.log(
    `\x1b[36m[${time}]\x1b[0m \n\tUser has accessed \x1b[31m${req.url}\x1b[0m`
  );
  next();
};

export default logger;
