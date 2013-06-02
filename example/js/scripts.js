/**
 * spLoader.js
 */

;(function (window, document, undefined) {
	'use strict';

	window.SPLoader = function(option) {
		this.option = option;
		this.init();

		return this;
	};

	window.SPLoader.prototype = {

		// venderPrefix: ['webkit', 'moz', ''],

		defaults: {
			classNames: {
				all: 'sp-loader',
				bg: 'sp-loader-bg',
				icon: 'sp-loader-icon'
			},
			icon: 'spinner',
			text: 'LOADING'
		},

		el: {
			all: document.createElement('div'),
			bg: document.createElement('div'),
			icon: document.createElement('div'),
			stylesheet: document.createElement('style')
		},

		styles: {
			layer: {
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 9000,
				width: '100%',
				height: '100%'
			},

			icon: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				zIndex: 9001
			}
		},

		icon: {

			spinner: {
				children: '',
				animation: ''
			},

			dots: {
				children: '<div><div class="sp-loader-dot"></div><div class="sp-loader-shadow"></div></div>' +
					'<div><div class="sp-loader-dot"></div><div class="sp-loader-shadow"></div></div>' +
					'<div><div class="sp-loader-dot"></div><div class="sp-loader-shadow"></div></div>' +
					'<div><div class="sp-loader-dot"></div><div class="sp-loader-shadow"></div></div>' +
					'<div><div class="sp-loader-dot"></div><div class="sp-loader-shadow"></div></div>',
				animation: ''
			},

			textRotate: {
				animation: ''
			}

		},


		build: function(context) {
			// string
			if(typeof context === 'string') {
				this.el.icon.innerHTML = context;
			// array
			} else if (typeof context === 'object') {
				for (var i = 0, l = context.length; i < l; i++) {
					this.el.icon.appendChild(context[i]);
				}
			}
		},

		separateStr: function(str) {
			var l = str.length,
				strs = [];

			for (var i = 0; i < l; i++) {
				strs.push(str.charAt(i));
			}

			return strs;
		},

		toDom: function(array, tagName) {
			var l = array.length,
				tags = [];

			for (var i = 0; i < l; i++) {
				var text = document.createTextNode(array[i]),
					tag = document.createElement(tagName);

				tag.appendChild(text);
				tags[i] = tag;
			}
			return tags;
		},

		// aName: {},

		init: function() {
			var self = this,
				el = this.el,
				body = document.getElementsByTagName('body')[0],
				head = document.getElementsByTagName('head')[0];

			head.appendChild(el.stylesheet);

			// setup elements
			el.all.className = this.defaults.classNames.all;
			el.bg.className = this.defaults.classNames.bg;
			el.icon.className = this.defaults.classNames.icon;

			for (var key in self.styles.layer) {
				el.all.style[key] = this.styles.layer[key];
				el.bg.style[key] = this.styles.layer[key];
			}

			el.all.style.display = 'none';

			el.all.appendChild(el.bg);
			el.all.appendChild(el.icon);
			body.appendChild(el.all);

			// build loading icon
			var separated, tags;
			el.icon.className = el.icon.className + ' ' +
				'sp-loader-' + (this.option.icon || this.defaults.icon);
			if(this.option.icon !== 'rotateText') {
				this.build(this.icon[this.option.icon].children || this.icon[this.defaults.icon].children);
			} else {
				separated = this.separateStr(this.option.text || this.defaults.text);
				tags = this.toDom(separated, 'span');
				this.build(tags);
			}

			for (var key in self.styles.icon) {
				el.icon.style[key] = self.styles.icon[key];
			}

			// var icon = document.getElementsByClassName('type3')[0];
			// var span = icon.getElementsByTagName('span');
			// console.log(span);

			// for (var i = 0, l = span.length; i < l; i++) {
			// 	var style = span[i].style;
			// 	style.webkitAnimation = 'type3 0.8s 1 ease-out';
			// 	style.webkitAnimationDelay = 0.3 * i + 's';
			// }
		},


		show: function() {
			this.el.all.style.display = 'block';

			return this;
		},

		hide: function() {
			this.el.all.style.display = 'none';

			return this;
		}

	};

	document.addEventListener('DOMContentLoaded', function() {
		var loading = new SPLoader({
			icon: 'spinner'//, text: 'Loading'
		}).show();

		document.addEventListener('click', function(e) {
			loading.hide();
		}, false);
	}, false);

})(this, this.document);
