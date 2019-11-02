const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// permet de récupérer l'objet "req.body" des requêtes post
app.use(express.urlencoded({extended: true})); 

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'racine',
	layoutsDir: __dirname + '/views/',
}));

app.set('view engine', 'hbs');

/*
	Sous routeur (le fichier appelé par require doit utiliser express.Router()
	De plus, toutes les routes commenceront par "animals"
*/
app.use('/animals', require('./server/animalsRequests'));

app.post('/*', function(req, res) {
	res.send(req.query);
});

app.get('/*', function(req, res) {
	let data = {
		title: "Premiers pas avec AJAX", 
		content: "Choisissez un groupe d'animaux à récupérer"
	};
	res.render('main.hbs', data);
});

app.listen(port);