require.config({
    paths: {
        'jquery': '../components/jquery/jquery.min',
        'Capture': '../components/capture/capture.min'
    },
    shim: {
        'jquery': {
            'exports': '$'
        }
    }
});

require(['site', 'helpers/log'], function (Site, log) {
    'use strict';
    var Site = new Site();
    $(function () {
        Site.ready();
    });
});