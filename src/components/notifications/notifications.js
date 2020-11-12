class Notification {
	constructor (opt = {}) {
		this.title = opt.title || 'Notification title';
		this.message = opt.message || 'Message text';
		this.type = opt.type || 'default';
		this.removalDelay = opt.removalDelay || 5000;
		this.maxQnt = 4;

		if (!document.querySelector('.notifications-container')) {
			this.container = this.stringToHTML('<div class="notifications-container"></div>').children[0];
			document.getElementsByTagName('body')[0].appendChild(this.container);
		}
		this.container = document.querySelector('.notifications-container');

		this.removeExcess();

		this.insertTile(this.createTile());
	}

	removeExcess() {
		if (this.container.children.length >= this.maxQnt) {
			for (var i = 0; i + this.maxQnt - 1 < this.container.children.length; i++) {
				this.removeTile(this.container.children[i]);
			}
		}
	}

	stringToHTML(string) {
		var htmlContainer = document.createElement('htmlContainer');
		htmlContainer.innerHTML = string;
		return htmlContainer;
	}


	setAutoRemoval(tile) {
		setTimeout(()=>{
			this.removeTile(tile);
		}, this.removalDelay);
	}

	removeTile(tile, duration =400) {
		function fadeOut(el, duration =400, cb) {
			el.style.opacity = el.style.opacity || 1;

			var last = +new Date();
			var tick = function() {
				el.style.opacity = +el.style.opacity - (new Date() - last) / duration;
				last = +new Date();

				if (+el.style.opacity > 0) {
					(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
				} else {
					cb(el);
				}
			};

			tick();
		}
		fadeOut(tile, duration, (tile)=>{
			tile.remove();
		});
	}

	getTileTpl() {
		let tileTpl = this.stringToHTML('<div class="tile"><div class="close-btn cross"><div class="lines"></div></div><div class="title"></div><div class="message"></div></div>').children[0];
		tileTpl.querySelector('.close-btn').style.animationDuration = this.removalDelay + 'ms';
		tileTpl.querySelector('.close-btn').classList.add('animate');

		tileTpl.addEventListener('click', (e)=>{
			this.removeTile(e.currentTarget, 200);
		}, false);
		return tileTpl;
	}

	createTile() {
		let tileTpl = this.getTileTpl();

		tileTpl.classList.add(this.type);
		tileTpl.getElementsByClassName('title')[0].innerHTML = this.title;
		tileTpl.getElementsByClassName('message')[0].innerHTML = this.message;

		return tileTpl;
	}

	insertTile(tile) {
		this.container.appendChild(tile);
		this.setAutoRemoval(tile);
	}
}

window.Notification = Notification
