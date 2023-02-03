
const axios = require('axios');
// require utils
// require models
const { companies } = require('../database/models');

const getCompanyDetails = require('../utils/getCompanyDetails.js');
const HttpError = require('../utils/HTTPError');
const companyServices = {
  'saveCompany': async (body) => {
    const urlLink = body.urlLink;
    // const companyDetails = await getCompanyDetails(urlLink);
    // console.log(Array.isArray(companyDetails));
    // console.log(companyDetails[0]);
    // await companies.bulkCreate(companyDetails);
    const createdCompanies = await companies.findAll({
      attributes: ['id', 'company_id', 'company_name', 'score']
    }
    );
    return createdCompanies;
  },
  'getCompaniesBySector': async (sector) => {
    const companiesBySector = await companies.findAll({
      where: {
        company_sector: sector
      },
      attributes: ['id', 'company_id', 'company_name', 'ceo', 'score'],
      order: [['score', 'DESC']]
    });
    if (!companiesBySector) {
      throw new HttpError('Sector not found', 404);
    }
    return companiesBySector;
  },
  'updateCompany': async (id, body) => {
    await companies.update(body, {
      where: {
        id
      },
      attributes: ['id', 'company_id', 'company_name', 'ceo', 'score']
    });
    const updatedCompany = await companies.findOne({
      where: {
        id
      },
      attributes: ['id', 'company_id', 'company_name', 'ceo', 'score']
    });
    if (!updatedCompany) {
      throw new HttpError('Company not found', 404);
    }
    return updatedCompany;
  }
}
module.exports = companyServices;