
/*=============================================
=            number inputs handler            =
=============================================*/

(()=>{
	let inputs = document.querySelectorAll('input[type="number"]');
	inputs.forEach(function(input) {
		input.addEventListener('blur', function (e) {
			e.target.value = e.target.value.replace(/[^+\s\d]/g, '');
			let val = e.target.value
			if (!!e.target.getAttribute('max') && +val > e.target.getAttribute('max')) {
				e.target.value = e.target.getAttribute('max');
			}
			if (!!e.target.getAttribute('min') && +val < e.target.getAttribute('min')) {
				e.target.value = e.target.getAttribute('min');
			}
		}, false);
	});
})();

/*=====  End of number inputs handler  ======*/


/*=======================================
=            required states            =
=======================================*/

(()=>{
	// generate groups

	let groups = new Map();
	document.querySelectorAll('input[data-required-group]').forEach(function(input) {
		if (groups.get(input.dataset.requiredGroup)) {
			groups.get(input.dataset.requiredGroup).push(input);
		} else {
			groups.set(input.dataset.requiredGroup, [input]);
		}
	});

	// set connections

	groups.forEach(function(group) {
		group.forEach(function(input) {
			let groupmates = [...group];
			groupmates.splice(groupmates.indexOf(input), 1);

			input.addEventListener('input', function () {
				groupmates.forEach(function(mate) {
					if (input.value.length > 0) {
						mate.removeAttribute("required");
						mate.closest(".input-wrapper").classList.remove("required");
					} else {
						mate.setAttribute("required", "required");
						mate.closest(".input-wrapper").classList.add("required");
					}
				});
			}, false);
		});
	});

})();

/*=====  End of required states  ======*/



(()=>{
	let forms = [
		...document.querySelectorAll('form.feedback-form')
	];
	if (forms.length < 1) return false;

	forms.forEach((form)=>{
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			if (form.classList.contains('sent')) return false;
			form.classList.add('sent');
			let data = new FormData(form);
			let url = form.getAttribute('action');
			let sendBtn = form.querySelector('.submit-btn');

			fetch(process.env.API_HOST + url, {
				method: 'POST',
				body: data
			}).then((response)=>{
				if (response.ok) {
					form.classList.add('successful');
					sendBtn.classList.toggle('done', true);
					setTimeout(function() {
						form.reset();
						form.classList.remove('successful');
						form.classList.remove('sent');
						sendBtn.classList.toggle('done', false);
					}, 4000);
				} else {
					if (response.statusText) {
						new window.Notification({
							type: "error",
							title: "Error",
							message: response.statusText
						});
					}
					if (response.errors) {
						for (var key in response.errors) {
							new window.Notification({
								type: "error",
								title: key,
								message: response.errors[key]
							});
						}
					}
					form.classList.remove('sent');
				}
			});

		}, false);
	})
})();
