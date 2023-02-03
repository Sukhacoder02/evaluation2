
// require JOI
const Joi = require('joi');

const urlLinkSchema = Joi.object({
  url: Joi.string().uri().required()
});
