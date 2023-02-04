// require axios
const axios = require('axios');
const { EagerLoadingError } = require('sequelize');

let uniqueSectors = [];

const companyDetails = [];
let scoreArray = [];

const addCompanyDetails = async () => {
  // let newCompanyArray = [];
  for (let i = 0; i < companyDetails.length; i++) {
    let id = companyDetails[i].company_id;
    await axios
      .get(`http://54.167.46.10/company/${id}`)
      .then((response) => {
        // let newCompany = { ...companyArray[i] };
        let data = response.data;
        companyDetails[i].company_name = data.name;
        companyDetails[i].company_description = data.description.substring(0, 250);
        companyDetails[i].ceo = data.ceo;
        companyDetails[i].tags = data.tags;
      });
  }
  return getScoreBySector();
}
const getScoreBySector = async () => {
  for (let i = 0; i < uniqueSectors.length; i++) {
    const sector = uniqueSectors[i];
    await axios
      .get(`http://54.167.46.10/sector?name=${sector}`)
      .then((response) => {
        const data = response.data;
        data.forEach((company) => {
          // let foundCompany = companyDetails.find((originalCompany) => originalCompany.company_id === company.companyId);
          // console.log(foundCompany);
          let scoreObject = {};
          company.performanceIndex.forEach((parameter) => {
            scoreObject[parameter.key] = parameter.value;
          });
          let score = ((scoreObject.cpi * 10) + (scoreObject.cf / 10000) + (scoreObject.mau * 10) + scoreObject.roic) / 4;
          score = Math.round(score * 100) / 100;
          scoreArray.push(score);
        });
      });
  }
  for (let i = 0; i < companyDetails.length; i++) {
    companyDetails[i].score = scoreArray[i];
  }
  return companyDetails;
}


const getCompanyDetails = async (urlLink) => {
  const sectors = [];
  return await axios
    .get(urlLink)
    .then((response) => {
      let data = response.data;
      let dataArray = data.split('\n');

      dataArray.map((item) => {
        let itemArray = item.split(',');
        let company = {
          company_id: itemArray[0],
          company_sector: itemArray[1],
        };
        sectors.push(itemArray[1]);

        companyDetails.push(company);
      });
      companyDetails.splice(0, 1);
      sectors.splice(0, 1);
      uniqueSectors = [...new Set(sectors)];

      return addCompanyDetails();
    });
}



module.exports = getCompanyDetails;