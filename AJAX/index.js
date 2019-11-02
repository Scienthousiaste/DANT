const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

const felins = [{name:'Chat', picture: 'img/cat.jpg'},
				{name:'Panthère', picture: 'img/panthere.jpg'},
				{name:'Lion', picture: 'img/lion.jpg'}];
const primates = [{name:'Capucin', picture: 'img/capucin.jpg'},
				{name:'Tarsier', picture: 'img/tarsier.jpg'},
				{name:'Lémurien', picture: 'img/lemurien.jpg'}];

app.use(express.static('public'));

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'racine',
	layoutsDir: __dirname + '/views/',
}));

app.set('view engine', 'hbs');

app.get('/animals', (req, res) => {
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

app.post('/*', (req, res) => {
	res.send(req.query);
});

app.get('/*', (req, res) => {
	let data = {
		title: "Premiers pas avec AJAX", 
		content: "Choisissez un groupe d'animaux à récupérer"
	};
	res.render('main.hbs', data);
});

app.listen(port);
