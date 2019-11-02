
var animalSelector = select('#animalType');
animalSelector.on('change', function () {
	var animalType = this.value;
	select('#animalContainer').html("A la poursuite des animaux !");
	ajax.get('/animals', 
		{animalType},
		function(res) {
			select('#animalContainer').html(res);
		},
		function() {
			alert("Erreur lors de la requête")
		}
	);
})