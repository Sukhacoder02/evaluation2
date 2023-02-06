// require axios
const axios = require('axios');
const companyUtils = require('../../src/utils/companyUtils');

jest.mock('axios');
// jest.mock('companyUtils');
describe('Company Utils', () => {
  describe('function getCompanyDetails', () => {
    it('Should get initial company Details from the csv file', async () => {
      const resolvedValue = [
        {
          "id": 169,
          "company_id": "95b5a067-808a-44a9-a490-b4ef8a045f61",
          "company_name": "Volkswagen",
          "score": 15.78
        }];
      const csvString = { data: 'company_id,company_sector\n8727cc61-8c4b-4285-8853-2db808392c04,Technology' };
      const urlLink = "https://store-0001.s3.amazonaws.com/input.csv";
      axios.get.mockResolvedValueOnce(csvString);
      jest.spyOn(companyUtils, 'addCompanyDetails').mockResolvedValue(resolvedValue);
      const data = await companyUtils.getCompanyDetails(urlLink);
      expect(axios.get).toBeCalledWith(urlLink);
      expect(data).toEqual(resolvedValue);
    });
  });
  describe('function addCompanyDetails', () => {
    it('Should add further company details to the company details obtained from previous function', () => {
      const resolvedValue = [
        {
          id: 169,
          company_id: "95b5a067-808a-44a9-a490-b4ef8a045f61",
          company_name: "Volkswagen",
          score: 15.78,
          tags: ["proactive", "open-source", "24/7", "global", "cross-platform", "one-to-one", "next-generation", "sticky"],
          ceo: "Casey Kertzmann MD",
          description: "  facilis impedit.",
        }];
      const axiosResolvedValue = {
        id: "296247ef-c553-4704-ad67-0878c87ff729",
        name: "HDFC",
        description: "  facilis impedit.",
        ceo: "Casey Kertzmann MD",
        tags: ["proactive", "open-source", "24/7", "global", "cross-platform", "one-to-one", "next-generation", "sticky"]
      };
      const mockIncompleteCompanyDetails = {
        company_id: "95b5a067-808a-44a9-a490-b4ef8a045f61",
        comapny_sector: "Technology"
      };
      const axiosLink = `http://54.167.46.10/company/${mockIncompleteCompanyDetails.company_id}`;
      const mockSectors = ['Technology', 'Finance'];
      axios.get.mockResolvedValueOnce(axiosResolvedValue);
      jest.spyOn(companyUtils, 'getScoreBySector').mockResolvedValue(resolvedValue);
      const data = companyUtils.addCompanyDetails(mockIncompleteCompanyDetails, mockSectors);
      expect(axios.get).toBeCalledWith(axiosLink);
      expect(data).toEqual(resolvedValue);
    });
  });
});