var select = (function() {

	function addClass(newClass) {
		for (var i = 0; i < this.length; i++) {
			this[i].className += ' ' + newClass;
		}
		return this;
	}

	function removeClass(classToRemove) {
		for (var i = 0; i < this.length; i++) {
			var oldClasses = this[i].className.split(' ');
			var newClasses = [];

			for (var j = 0; j < oldClasses.length; j++) {
				if (oldClasses[j] !== classToRemove) {
					newClasses.push(oldClasses[j]);
				}
			}
			this[i].className = newClasses.join(' ');
		}
		return this;
	}

	function changeText(newContent) {
		for (var i = 0; i < this.length; i++) {
			this[i].textContent = newContent;
		}
		return this;
	}

	function select(queryString) {
		var selectedElems = document.querySelectorAll(queryString);
		selectedElems.addClass = addClass;
		selectedElems.removeClass = removeClass;
		selectedElems.changeText = changeText;

		return (selectedElems);
	}

	return select;
})();