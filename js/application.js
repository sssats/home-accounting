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
            client.authenticate({interactive: false});
            if (!client.isAuthenticated()) client.authenticate();
            Backbone.DropboxDatastore.client = client;
            console.log(client.isAuthenticated());

            var router = new Router();
            
            console.log(client)

            $('.logout').on('click', function () {
                client.signOff();
            });


            Backbone.history.start();
        }
    };
});



