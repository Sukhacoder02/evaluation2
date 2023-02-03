// require companyService
const companyServices = require('../../src/services/companyServices.js');
// require HTtpError
const HttpError = require('../../src/utils/HTTPError');
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
  describe('function getCompaniesBySector', () => {
    it('should return an array of companies filtered by sector', async () => {
      const returnValue = [
        {
          "company_id": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
          "company_name": "Apple",
          "ceo": "Dr. Christina Batz",
          "score": 26.17,
          "rank": 1
        }];
      jest.spyOn(companies, 'findAll').mockResolvedValue(returnValue);
      const companiesBySector = await companyServices.getCompaniesBySector('Software');
      expect(companiesBySector).toEqual(returnValue);
    });
    it('should throw an error when sector doesn\'t exists', async () => {
      const err = new HttpError('Sector not found', 404);
      jest.spyOn(companies, 'findAll').mockResolvedValue(null);
      const mockId = 11;
      await expect(companyServices.getCompaniesBySector(null)).rejects.toThrow(err);
    });
  });
}); 
