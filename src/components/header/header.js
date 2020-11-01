(()=>{
	var mainHeader = document.querySelector('header.main-header');
	if (!mainHeader) return false;

	function updateHeaderSticking() {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		mainHeader.classList.toggle('unsticked', scrolled > 5);
	}

	window.addEventListener('scroll', function() {
		window.throttling(updateHeaderSticking)
	}, false);

	window.addEventListener('load', function () {
		updateHeaderSticking();
	}, false);
})()
