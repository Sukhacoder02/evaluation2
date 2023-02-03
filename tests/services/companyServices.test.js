// require companyService
const companyServices = require('../../src/services/companyServices.js');
// require model
const { companies } = require('../../src/database/models');

describe('companyServices', () => {
  describe('function saveCompany', () => {
    it('should return an array of saved companies', async () => {
      const returnValue = [
        {
          "company_id": "95b5a067-808a-44a9-a490-b4ef8a045f61",
          "company_name": "Volkswagen",
          "score": 0
        }];
      const mockBody = {
        urlLink: "https://store-0001.s3.amazonaws.com/input.csv"
      };
      jest.spyOn(companies, 'findAll').mockResolvedValue(returnValue);
      const savedCompanies = await companyServices.saveCompany(mockBody);
      expect(savedCompanies).toEqual(returnValue);
    });
  });
}); 
