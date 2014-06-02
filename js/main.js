requirejs.config({
    baseUrl: "js/",
    paths: {
        "jquery": "vendors/jquery.min",
        "underscore": "vendors/underscore-min",
        "backbone": "vendors/backbone-min",
        "dropbox": "vendors/backbone.dropboxDatastore",
        "controller": "vendors/backbone.controller",
        "text": "vendors/text",
        "date": "vendors/jquery-dateFormat",
        "bootstrap": "../bootstrap3/js/bootstrap.min",
        "charts": "vendors/highcharts",
        "datePicker": "vendors/jquery.pickmeup.min"
    }
});

require(['application', 'dropbox'], function (application, dropbox) {
    application.initialize();
});