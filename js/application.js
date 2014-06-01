define([
    'jquery',
    'underscore',
    'backbone',
    'routers/Router',
], function ($, _, Backbone, Router) {

    return {
        controllers: {},
        initialize: function () {

            var APP_KEY = 'tkpq7yyr9hqkbds';

            client = new Dropbox.Client({key: APP_KEY});
            client.authenticate({interactive: true});
            if (!client.isAuthenticated()) {
                client.authenticate({interactive: true});
            }
            Backbone.DropboxDatastore.client = client;

            var router = new Router();

            $('.logout').on('click', function () {
                client.signOff();
                window.location = "/";
            });


            Backbone.history.start();
        }
    };
});



