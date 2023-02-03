// require express
const express = require('express');
const { valid } = require('joi');
// require controller
const { saveCompany, getCompaniesBySector, updateCompany, getAllCompanies } = require('../controllers/companyController.js');
// require middleware
const { validator } = require('../middlewares/request.validator.js');
// require schemas
const { urlLinkSchema, sectorSchema, idSchema, updateCompanySchema } = require('../middlewares/schemas.validator.js');
const router = express.Router();



router.get('', (req, res) => {
  res.send('Hello World');
});


router.post('/save', validator(urlLinkSchema, 2), saveCompany);
router.get('/companies', validator(sectorSchema, 1), getCompaniesBySector);
router.patch('/companies/:id', validator(idSchema, 3), validator(updateCompanySchema, 2), updateCompany);
router.get('/company', getAllCompanies);




module.exports = router;