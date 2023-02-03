
// require all schemas
const validator = (schema, key) => (req, res, next) => {
  const { error } = schema.validate(key === 1 ? req.query : (key === 2 ? req.body : (key === 3 ? req.params : req.headers)));
  if (error) {
    res.status(400);
    res.json({ message: error.message });
  } else {
    next();
  }
};
module.exports = { validator };