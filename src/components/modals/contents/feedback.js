(()=>{
	let form = document.querySelector('form.feedback-form');

	form.querySelectorAll('.submit-btn').forEach(function(btn) {
		btn.addEventListener('click', function (e) {
			btn.classList.toggle('done');
		}, false);
	});
})()
