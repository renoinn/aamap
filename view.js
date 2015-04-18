var View = (function() {
	function View() {
		_map = $('#map img').attr('class');
		_bindEvents();
		_mappingHome();
	};

	// ===== public  =====
	View.isEditMode = false;
	View.addHomeDone = function() {
		console.log('add home.');
		$('#success').show()
			.removeClass('sr-only')
			.delay(3000)
			.slideUp(2000, function() {
			$(this).addClass('sr-only');
		});
	};

	// ===== private =====
	var _map = '';
	var _homeData = new Array();
	function _bindEvents() {
		$('#map img').click(function(e) {
			e.preventDefault();
			if (!View.isEditMode) {
				return;
			}
			_addHome(e.pageX, e.pageY);
		});

		$('#addHome').click(function(e) {
			e.preventDefault();
			View.isEditMode = true;
			$('body').css('cursor', 'crosshair');
		});
	};

	function _addHome(pageX, pageY) {
		var offset = $('#map img').offset();
		var posX = pageX - offset.left;
		var posY = pageY - offset.top;
		var name = $('#control :text[name="name"]').val();
		var isopen = $('#control :checkbox[name="isopen"]').prop('checked');
		var pass = $('#control :text[name="pass"]').val();
		var controller = new Controller();
		Controller.onClickMapImage(_map, name, isopen, posX, posY, pass, View.addHomeDone);

		View.isEditMode = false;
		$('body').css('cursor', 'auto');
	};

	function _mappingHome() {
		$('.home-item').each(function() {
			var $item = $(this);
			var data = {
				'name': $item.data('name'),
				'posX': $item.data('posx'),
				'posY': $item.data('posy'),
			};
			console.log(data);
			$item.css({
				'position': 'absolute',
				'left': data.posX - 8,// ポインター画像の大きさの分だけ引く
				'top': data.posY - 20,
			});
			$item.find('.pointor').bind('click', function(e) {
				e.preventDefault();
				var $targetItem = $(this).parent().find('.panel');
				$targetItem.css
				$targetItem.show();
				$targetItem.click(function() {
					$(this).hide();
				});
			});
		});
	};

	return View;
})();
var view = new View();
