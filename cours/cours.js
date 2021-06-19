const express = require('express');
const path = require('path');
const router = express.Router();

const class0Router = require('./cours0/cours0');
const class1Router = require('./cours1/cours1');

router.use('/0', class0Router);
router.use('/1', class1Router);

router.get('/', (req, res) => {
	res.render("cours.pug");
});

module.exports = router;
