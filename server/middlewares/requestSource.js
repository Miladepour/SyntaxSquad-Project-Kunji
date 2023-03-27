function requestSource(req, res, next) {
  if (req.get("Request-Source")) {
    next();
  } else {
    res.status(401).send("Not authorized.");
  }
}

module.exports = requestSource;