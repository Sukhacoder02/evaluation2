
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

const updateCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCompany = await companyServices.updateCompany(id, req.body);
    res.status(200);
    res.json(updatedCompany);
  } catch (error) {
    res.status(error.errorCode);
    res.json({ message: error.message });
  }
}
const getAllCompanies = async (req, res) => {
  const companies = await companyServices.getAllCompanies();
  res.status(200);
  res.json(companies);
}
module.exports = {
  saveCompany,
  getCompaniesBySector,
  updateCompany,
  getAllCompanies
};