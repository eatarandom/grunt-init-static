require.config({
    paths: {
        'jquery': '../components/jquery/jquery.min'
    },
    shim: {
        "jquery": {
            "exports": "$"
        }
    }

});

require(['site'], function (Site) {
    'use strict';
    window.Site = new Site();
});