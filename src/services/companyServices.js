
const axios = require('axios');
// require utils
// require models
const { companies } = require('../database/models');

const getCompanyDetails = require('../utils/getCompanyDetails.js');
const companyServices = {
  'saveCompany': async (body) => {
    const urlLink = body.urlLink;
    // const companyDetails = await getCompanyDetails(urlLink);
    // console.log(Array.isArray(companyDetails));
    // console.log(companyDetails[0]);
    // await companies.bulkCreate(companyDetails);
    const createdCompanies = await companies.findAll({
      attributes: ['company_id', 'company_name']
    }
    );
    return createdCompanies;
  }
}
module.exports = companyServices;