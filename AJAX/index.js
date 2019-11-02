const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'racine',
	layoutsDir: __dirname + '/views/',
}));

app.set('view engine', 'hbs');

app.get('/test', (req, res) => {
	console.log(req.query);
	res.send(req.query);
});

app.post('/*', (req, res) => {
	res.send(req.query);
});

app.get('/*', (req, res) => {
	let data = {title: "titre", content: "ceci est un contenu"};
	res.render('test.hbs', data);
});

app.listen(port);
