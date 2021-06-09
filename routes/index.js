const router = require('express').Router();
//import all api routes from /api/index.js, no need for index.js as it is implied
const apiRoutes = require('./api');

//add prefix '/api' to all the api routes imported from 'api' folder
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;