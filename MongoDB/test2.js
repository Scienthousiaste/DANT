

const __PASSWORD__ = require('./config/pwd.js');

//const pwd = encodeURIComponent(__PASSWORD__);
const pwd = encodeURIComponent("DANT_macaroni");

const mongoose = require('mongoose');

const uri = "mongodb+srv://user_project_1:"+pwd+"@dant-kkn0r.mongodb.net/project1?retryWrites=true&w=majority";


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
		name: 'Doc test from 42',
		author: 'tbehra',
		tags: ['node', 'backend'],
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

 



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://tbehra:<password>@dant-kkn0r.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
