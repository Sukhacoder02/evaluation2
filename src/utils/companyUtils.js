// require axios
const axios = require('axios');

const addCompanyDetails = async (incompleteCompanyDetails, sectors) => {
  const promiseArray = [];
  for (let i = 0; i < incompleteCompanyDetails.length; i++) {
    let id = incompleteCompanyDetails[i].company_id;
    promiseArray.push(axios.get(`http://54.167.46.10/company/${id}`));
  }
  let responses = await Promise.all(promiseArray);
  responses.forEach((response, index) => {
    const company = response.data;
    incompleteCompanyDetails[index].company_name = company.name;
    incompleteCompanyDetails[index].company_description = company.description.substring(0, 250);
    incompleteCompanyDetails[index].ceo = company.ceo;
    incompleteCompanyDetails[index].tags = company.tags;
  });
  return await companyUtils.getScoreBySector(incompleteCompanyDetails, sectors);
}
const getScoreBySector = async (completeCompanyDetails, sectors) => {
  const promiseArray = [];
  for (let i = 0; i < sectors.length; i++) {
    promiseArray.push(axios.get(`http://54.167.46.10/sector?name=${sectors[i]}`));
  }
  let responses = await Promise.all(promiseArray);
  responses.forEach((response) => {
    const data = response.data;
    data.forEach((company) => {
      let foundCompany = completeCompanyDetails.find((originalCompany) => originalCompany.company_id === company.companyId);
      let scoreObject = {};
      company.performanceIndex.forEach((parameter) => {
        scoreObject[parameter.key] = parameter.value;
      });
      let score = ((scoreObject.cpi * 10) + (scoreObject.cf / 10000) + (scoreObject.mau * 10) + scoreObject.roic) / 4;
      score = Math.round(score * 100) / 100;
      if (foundCompany) {
        foundCompany.score = score;
      }
    });
  })
  return completeCompanyDetails;
}


const getCompanyDetails = async (urlLink) => {
  let sectors = new Set();
  const companyArray = [];
  const axiosData = await axios.get(urlLink);
  let data = axiosData.data;
  let dataArray = data.split('\n');
  dataArray.forEach((dataItem) => {
    let itemArray = dataItem.split(',');
    let company = {
      company_id: itemArray[0],
      company_sector: itemArray[1],
    };
    sectors.add(itemArray[1]);
    companyArray.push(company);
  });
  companyArray.splice(0, 1);
  sectors.delete('company_sector');
  sectors = [...sectors];
  return await companyUtils.addCompanyDetails(companyArray, sectors);
}



const companyUtils = { getCompanyDetails, addCompanyDetails, getScoreBySector };
module.exports = companyUtils;