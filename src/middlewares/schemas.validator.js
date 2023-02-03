
// require JOI
const Joi = require('joi');

const urlLinkSchema = Joi.object({
  urlLink: Joi.string().uri().required()
});

const sectorSchema = Joi.object({
  sector: Joi.string().required()
}).required();

const idSchema = Joi.object({
  id: Joi.string().alphanum().required().regex(/^[0-9]*$/)
}).required();

const updateCompanySchema = Joi.object({
  company_name: Joi.string(),
  ceo: Joi.string(),
  company_description: Joi.string(),
  tags: Joi.array(),
}).required().min(1);


module.exports = {
  urlLinkSchema,
  sectorSchema,
  idSchema,
  updateCompanySchema
};