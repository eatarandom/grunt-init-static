define(['jquery', 'modules/news'], function ($, news) {
	'use strict';

	var Site = function () {
		this.modules = $('[data-module]');
		this.supports = {
			touch: !! ('ontouchstart' in window) || !! ('onmsgesturechange' in window)
		};
		this._initialize();
	};

	Site.prototype._initialize = function () {
		for (var i = 0, l = this.modules.length; i < l; i++) {
			var $el = this.modules.eq(i);
			var module = $el.data().module;
			(function (el, site) {
				require([module], function (m) {
					if (m && typeof m === 'object') {
						m.initialize.call(m, el, site);
						return;
					}
					// error check here
				});
			})($el, this);
		}
		return this;
	};

	return Site;

});