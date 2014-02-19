define(['jquery', 'Capture'], function ($, Capture) {
	'use strict';

	// main site object
	var Site = function () {
		this.supports = {
			touch: !! ('ontouchstart' in window) || !! ('onmsgesturechange' in window)
		};
		this.modules = [];
		this._initialize();
	};

	// site initilization stuff
	Site.prototype._initialize = function () {
		//this.capture = Capture;
	};

	// load modules
	Site.prototype._load = function () {
		var self = this;
		for (var i = 0, l = this.$modules.length; i < l; i++) {
			var $el = this.$modules.eq(i);
			var module = $el.data().module;
			// rework this
			(function (el, site) {
				require([module], function (m) {
					if (m && typeof m === 'object' && m['initialize']) {
						m.initialize.call(m, el, site);
					}
					self.modules[self.modules.length++] = m;
					return;
				}, function (err) {
					log('Site._load :: Can\'t find the src for module: ' + module);
				});
			})($el, this);
		}
		return this;
	};

	// called on dom ready
	Site.prototype.ready = function () {
		this.$modules = $('[data-module]');
		this._load();
	};

	return Site;

});