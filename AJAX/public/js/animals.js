
var animalSelector = select('#animalType');
animalSelector.on('change', function () {
	var animalType = this.value;
	select('#animalContainer').html("En attendant les animaux...<br><div id='loader'></div>");
	ajax.get('/animals/getAnimals', 
		{animalType},
		function(res) {
			select('#animalContainer').html(res);
		},
		function() {
			alert("Erreur lors de la requête get")
		}
	);
})

var changeNameButton = select('#changeNameButton');
changeNameButton.on('click', function() {
	var animalType = select('#animalType')[0].value;
	var newNames;
	if (animalType == 'felines') {
		newNames = ['Cat', 'Cheetah', 'Lion'];
	}
	else if (animalType == 'primates') {
		newNames = ['Monk Monkey', 'Eye Monkey', 'Tail Monkey'];
	}
	else {
		alert("Choisir un type d'animaux d'abord");
		return;
	}
	ajax.post('/animals/changeNames', 
		{animalType, newNames},
		function(res) {
			select('#animalContainer').html(res);
		},
		function() {
			alert("Erreur lors de la requête post")
		}
	)
})