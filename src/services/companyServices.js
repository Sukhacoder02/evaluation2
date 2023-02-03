
const axios = require('axios');
// require utils
// require models
const { companies } = require('../database/models');

const getCompanyDetails = require('../utils/getCompanyDetails.js');
const companyServices = {
  'saveCompany': async (body) => {
    const urlLink = body.urlLink;
    const companyDetails = await getCompanyDetails(urlLink);
    // console.log(Array.isArray(companyDetails));
    // console.log(companyDetails[0]);
    const createdCompanies = await companies.bulkCreate(companyDetails);
    return createdCompanies;
  }
}
module.exports = companyServices;