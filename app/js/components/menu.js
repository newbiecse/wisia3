var Menu = function(){
	var elemWidth, fitCount, ctr, $collectedSet;
	var $menu = $("ul#menu");
	var varWidth = 0;

	ctr = $menu.children().length;
	$menu.children().each(function() {
		varWidth += $(this).outerWidth();
	});
	var _loginHtml = $("#submenu").html();
	collect();
	$(window).resize(collect);

	function collect() {
		elemWidth = $menu.width();
		fitCount = Math.floor((elemWidth / varWidth) * ctr) - 1;
		$menu.children().css({"display": "block", "width": "auto"});
		$collectedSet = $menu.children(":gt(" + fitCount + ")");
		$("#submenu").empty().append(
			$(_loginHtml)
		).append($collectedSet.clone());
		$collectedSet.css({"display": "none", "width": "0"});
	}	
};

