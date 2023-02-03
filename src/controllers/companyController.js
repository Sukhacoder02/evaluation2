
// require services
const companyServices = require('../services/companyServices.js');
const saveCompany = async (req, res) => {
  const savedCompanies = await companyServices.saveCompany(req.body);
  res.status(201);
  res.json(savedCompanies);
};

module.exports = {
  saveCompany
};