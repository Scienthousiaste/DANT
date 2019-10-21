const __PASSWORD__ = require('./config/pwd.js');

const pwd = encodeURIComponent(__PASSWORD__);

const mongoose = require('mongoose');

const uri = "mongodb+srv://tbehra:"+pwd+"@dant-kkn0r.mongodb.net/Test?retryWrites=true&w=majority";


const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [ String ],
	data: { type: Date, default: Date.now },
	isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
	const course = new Course({
		name: 'Cours de MongoDB',
		author: 'Timothée BEHRA',
		tags: ['node', 'backend'],
		isPublished: true
	})

	const result = await course.save();
	console.log(result);
}


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function() {
		console.log('now connected to mongodb!');

		createCourse();
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
