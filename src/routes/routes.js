// require express
const express = require('express');
// require controller
const { saveCompany, getCompaniesBySector, updateCompany } = require('../controllers/companyController.js');
const router = express.Router();



router.get('', (req, res) => {
  res.send('Hello World');
});


router.post('/save', saveCompany);
router.get('/companies', getCompaniesBySector);
router.patch('/companies/:id', updateCompany);





module.exports = router;