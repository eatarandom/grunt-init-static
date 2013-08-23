define(['jquery'], function ($) {
	'use strict';

	var log = window.log = function () {
		log.history = log.history || [];
		log.history.push(arguments);
		if (window.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
	};

	return log;
});