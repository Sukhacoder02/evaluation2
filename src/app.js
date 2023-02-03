
// require express
const express = require('express');
const port = 8000;
const router = require('./routes/routes.js');

const app = express();
app.use(express.json());
app.use('/api', router);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

