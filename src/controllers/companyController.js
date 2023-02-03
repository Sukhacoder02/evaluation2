
// require services
const companyServices = require('../services/companyServices.js');
const saveCompany = async (req, res) => {
  const savedCompanies = await companyServices.saveCompany(req.body);
  res.status(201);
  res.json(savedCompanies);
};

const getCompaniesBySector = async (req, res) => {
  const { sector } = req.query;
  console.log(req.query);
  try {
    const companies = await companyServices.getCompaniesBySector(sector);
    for (let i = 0; i < companies.length; i++) {
      companies[i].dataValues.rank = i + 1;
    }
    res.status(200);
    res.json(companies);
  } catch (error) {
    res.status(error.errorCode);
    res.json({ message: error.message });
  }
}

module.exports = {
  saveCompany,
  getCompaniesBySector
};