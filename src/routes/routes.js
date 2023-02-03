// require express
const express = require('express');
// require controller
const { saveCompany, getCompaniesBySector } = require('../controllers/companyController.js');
const router = express.Router();



router.get('', (req, res) => {
  res.send('Hello World');
});


router.post('/save', saveCompany);
router.get('/companies', getCompaniesBySector);





module.exports = router;