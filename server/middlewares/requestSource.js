function requestSource(req, res, next) {
  if (req.get("origin") === "http://localhost:3000" || req.get("origin" === "https://starter-kit-j5ar.onrender.com")) {
    console.log("Hello World");
    next();
  } else {
    res.status(401).send("Not authorized.");
  }
}

module.exports = requestSource;