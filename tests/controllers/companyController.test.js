// require controller

const companyController = require('../../src/controllers/companyController.js');
// require services
const companyServices = require('../../src/services/companyServices.js');

describe('Company Controller', () => {
  describe('function  saveCompany', () => {
    it('Should fetch all details from the apis and write them into the DB', async () => {
      const resolvedValue =
        [
          {
            "id": 4,
            "company_id": "8727cc61-8c4b-4285-8853-2db808392c04",
            "company_name": "Google",
            "ceo": "Mr. Jana Konopelski",
            "score": 17.41
          }
        ];
      const mockReq = {
        urlLink: "https://store-0001.s3.amazonaws.com/input.csv"
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
      jest.spyOn(companyServices, 'saveCompany').mockResolvedValue(resolvedValue);

      await companyController.saveCompany(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);

    });
  });
  describe('function  getCompaniesBySector', () => {
    it('Should fetch all companies by sector', async () => {
      const resolvedValue =
        [
          {
            dataValues: {
              "id": 4,
              "company_id": "8727cc61-8c4b-4285-8853-2db808392c04",
              "company_name": "Google",
              "ceo": "Mr. Jana Konopelski",
              "score": 17.41,
            },
          }
        ];
      const mockReq = {
        query: {
          sector: "Technology"
        }
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
      jest.spyOn(companyServices, 'getCompaniesBySector').mockResolvedValue(resolvedValue);

      await companyController.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
  });
  describe('function  updateCompany', () => {
    it('Should update company by id', async () => {
      const resolvedValue =
      {
        "id": 4,
        "company_id": "8727cc61-8c4b-4285-8853-2db808392c04",
        "company_name": "Google",
        "ceo": "Mr. Jana Konopelski",
        "score": 17.41,
      };
      const mockReq = {
        params: {
          id: 4
        },
        body: {
          company_name: "Google",
          ceo: "Mr. Jana Konopelski",
        }
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
      jest.spyOn(companyServices, 'updateCompany').mockResolvedValue(resolvedValue);

      await companyController.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
    it('Should throw an error when id is not found', async () => {
      const resolvedValue = {
        errorCode: 404,
        message: "Company not found"
      };
      const mockReq = {
        params: {
          id: 50
        },
        body: {
          company_name: "Google",
          ceo: "Mr. Jana Konopelski",
        }
      };
      const mockRes = {
        status: jest.fn(),
        json: jest.fn()
      };
      jest.spyOn(companyServices, 'updateCompany').mockRejectedValue(resolvedValue);

      await companyController.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ "message": "Company not found" });
    });
  });
});