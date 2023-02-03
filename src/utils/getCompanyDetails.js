// require axios
const axios = require('axios');

let uniqueSectors = [];
const companyDetails = [];
const addCompanyDetails = async (companyArray) => {
  let newCompanyArray = [];
  for (let i = 0; i < companyArray.length; i++) {
    let id = companyArray[i].company_id;
    await axios
      .get(`http://54.167.46.10/company/${id}`)
      .then((response) => {
        let newCompany = { ...companyArray[i] };
        let data = response.data;
        newCompany.company_name = data.name;
        newCompany.company_description = data.description.substring(0, 250);
        newCompany.ceo = data.ceo;
        newCompany.tags = data.tags;
        newCompany.score = 0;
        newCompanyArray.push(newCompany);
      });
  }
  return getScoreBySector(newCompanyArray);
}
const getScoreBySector = async (companyArray) => {
  uniqueSectors.forEach(async (sector) => {
    await axios
      .get(`http://54.167.46.10/sector?name=${sector}`)
      .then((response) => {
        const data = response.data;
        data.forEach((company) => {
          let foundCompany = companyArray.find((originalCompany) => {
            return originalCompany.company_id == company.companyId;
          });
          let scoreObject = {};
          company.performanceIndex.forEach((parameter) => {
            scoreObject[parameter.key] = parameter.value;
          });
          let score = ((scoreObject.cpi * 10) + (scoreObject.cf / 10000) + (scoreObject.mau * 10) + scoreObject.roic) / 4;
          score = Math.round(score * 100) / 100;
        });
      });
  });
  return companyArray;
}


const getCompanyDetails = async (urlLink) => {
  const sectors = [];
  return await axios
    .get(urlLink)
    .then((response) => {
      let data = response.data;
      let dataArray = data.split('\n');
      let companyArray = [];
      dataArray.map((item) => {
        let itemArray = item.split(',');
        let company = {
          company_id: itemArray[0],
          company_sector: itemArray[1],
        };
        sectors.push(itemArray[1]);

        companyArray.push(company);
      });
      companyArray.splice(0, 1);
      sectors.splice(0, 1);
      uniqueSectors = [...new Set(sectors)];

      return addCompanyDetails(companyArray);
    });
}



module.exports = getCompanyDetails;