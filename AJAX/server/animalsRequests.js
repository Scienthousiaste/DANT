var express = require('express')
var router = express.Router();

const felins = [{name:'Chat', picture: 'img/cat.jpg'},
				{name:'Panthère', picture: 'img/panthere.jpg'},
				{name:'Lion', picture: 'img/lion.jpg'}];
const primates = [{name:'Capucin', picture: 'img/capucin.jpg'},
				{name:'Tarsier', picture: 'img/tarsier.jpg'},
				{name:'Lémurien', picture: 'img/lemurien.jpg'}];

router.get('/getAnimals', function(req, res) {
	setTimeout(function() {
		if (req.query.animalType == 'felines') {
			res.render('animals.hbs', {layout: false, data: felins});
		}
		else if (req.query.animalType == 'primates') {
			res.render('animals.hbs', {layout: false, data: primates});
		}
		else {
			res.render('animals.hbs', {layout: false, data: false});
		}
	}, 1000)
});

router.post('/changeNames', function(req, res) {
	let animalsNameToChange = [];
	if (req.body.animalType == 'felines') {
		animalsNameToChange = felins;
	}
	else if (req.body.animalType == 'primates') {
		animalsNameToChange = primates;
	}
	else {
		res.sendStatus(404);
	}
	for (let i = 0; i < animalsNameToChange.length; i++) {
		animalsNameToChange[i].name = req.body.newNames.split(',')[i];
	}
	res.render('animals.hbs', {layout: false, data: animalsNameToChange});
});

module.exports = router;