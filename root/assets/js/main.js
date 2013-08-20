'use strict';
// test to see if we should load
// zepto or fallback to jquery
// returns object
// @param name
// @param src
/*
var library = (function() {
    var libs = [{
        name: 'zepto',
        src: '../components/zepto/zepto.min.js'
    }, {
        name: 'jquery',
        src: '../components/jquery/jquery.min.js'
    }];
    return libs[0] || libs[1];
})();
*/
require.config({
    paths: {
		'$': '../components/zepto/zepto.min.js',
        underscore: '../components/underscore/underscore-min.js'
    }
});

require(['site'], function (site) {
    'use strict';
    site.initialize();
});