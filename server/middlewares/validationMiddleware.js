const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    console.error("Validation error:", err);
    res.status(400).json({ error: err.errors });
  }
};

module.exports = validate;
