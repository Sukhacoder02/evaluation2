
// require services
const companyServices = require('../services/companyServices.js');
const saveCompany = (req, res) => {
  const savedCompanies = companyServices.saveCompany(req.body);
  res.status(201);
  res.json(savedCompanies);
};

module.exports = {
  saveCompany
};