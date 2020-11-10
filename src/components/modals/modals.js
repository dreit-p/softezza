(()=>{
	let body = document.getElementsByTagName('body')[0];
	let modalWrapper = document.querySelector('article.modal');
	if (!modalWrapper) {
		console.warn('Block of modals is not found');
		return false
	}
	let modalActivators = document.querySelectorAll('[data-open-modal]');
	if (modalActivators.length < 1) {
		console.warn('No modal activators found on the page');
		return false
	}

	modalActivators.forEach((activator)=>{
		activator.addEventListener('click', (e)=>{
			e.preventDefault();
			let modalType = e.currentTarget.dataset.openModal;
			openModal(modalType);
		}, false);
	});

	function openModal(modalType) {
		if (body.classList.contains('show-modal')) {
			if (!document.getElementById(modalType).classList.contains('active')) {
				hideModal();
				showModal(modalType)
			} else {
				hideModal();
			}
		} else {
			showModal(modalType);
		}
	}

	function hideModal() {
		modalWrapper.dispatchEvent(new CustomEvent('hideModal', {bubbles: true}));
		body.classList.remove('show-modal');
		window.lockScroll(false);
		modalWrapper.querySelectorAll('.active').forEach(contentWrapper => {
			contentWrapper.classList.remove('active');
			contentWrapper.classList.add('hidden');
			window.stopMedia(contentWrapper);
		});
	}

	function showModal(modalType) {
		modalWrapper.dispatchEvent(new CustomEvent('showModal', {bubbles: true}));
		let contentWrapper = document.getElementById(modalType);
		if (!contentWrapper) {
			console.warn('Needed modal is not found');
			return false;
		}
		contentWrapper.classList.add('active');
		contentWrapper.scrollTop = 0;
		contentWrapper.classList.remove('hidden');
		body.classList.add('show-modal');
		window.lockScroll(true);
		if (modalWrapper.classList.contains('autofocus')) {
			(input=>{
				if (input) input.focus();
			})(document.getElementById(modalType).querySelector('input'))
		}
	}



	window.closeModals = hideModal;
	window.openModal = openModal;

	document.addEventListener('keyup', function (e) {
		if (e.key === "Escape" && body.classList.contains('show-modal')) {
			hideModal();
		}
	}, false);
})()


/*=======================================
=            open form modal            =
=======================================*/

document.querySelectorAll('a[href*="open-form"]').forEach(function(btn) {
	btn.addEventListener('click', function (e) {
		e.preventDefault();
		window.openModal("feedback-modal");
	}, false);
});

/*=====  End of open form modal  ======*/


/*====================================================
=            mobile menu links behavior             =
====================================================*/

document.querySelectorAll('#menu-modal a[href^="#"]').forEach(function(btn) {
	btn.addEventListener('click', function () {
		let anchor = btn.href.substring(btn.href.indexOf("#")+1);
		if (document.getElementById(anchor)) {
			window.closeModals();
		}
	}, false);
});

/*=====  End of mobile menu links behavior   ======*/
