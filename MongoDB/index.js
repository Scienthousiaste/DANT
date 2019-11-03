/*
	Créer un dossier config, contenant un fichier pwd.js, 
	et mettre dans ce fichier js uniquement la ligne suivante : 
			module.exports = "__votre_mot_de_passe__";

	(en remplaçant __votre_mot_de_passe__ par le mot de passe fourni)
*/

const __PASSWORD__ = require('./config/pwd.js');
const project_number = 0; //Changer ici par votre numéro de projet

// Ne pas changer ces lignes

const pwd = encodeURIComponent(__PASSWORD__);
const project_name = 'project' + project_number;
const user_name = 'user_project_' + project_number;
const mongoose = require('mongoose');
const uri = "mongodb+srv://" + user_name + ":" + pwd 
		+ "@dant-kkn0r.mongodb.net/"
		+ project_name + "?retryWrites=true&w=majority";
//

const docSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [ String ],
	data: { type: Date, default: Date.now },
	isPublished: Boolean
});
const Doc = mongoose.model('Doc', docSchema);

async function createDoc() {
	const doc = new Doc({
		name: 'Document test',
		author: user_name,
		tags: ['test'],
		isPublished: true
	})

	const result = await doc.save();
	console.log(result);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function() {
		console.log('now connected to mongodb!');
		createDoc();
	})
	.catch(function (err) {
		console.log ("Erreur lors de la connection à mongodb : ", err);
	})

 