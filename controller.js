var Controller = (function() {
	function Controller() {
	};

	// ===== public  =====
	Controller.onClickMapImage = function(map, name, isopen, posX, posY, pass, callback) {
		if (name == '') {
			console.log('name empty.')
			return;
		}

		var data = {
			'map': map,
			'name': name,
			'isopen': isopen,
			'posX': posX,
			'posY': posY,
			'pass': pass,
		};
		console.log(data);
		_requestAsync(data, 'POST', callback);
	};

	// ===== private =====
	function _requestAsync(data, method, callback) {
		var url = 'http://' + location.hostname + '/aamap/addhome.php';

		$.ajax({
			url: url,
			data: data,
			method: method,
		})
		.done(function(data) {
			callback();
		});
	};

	return Controller;
})();
