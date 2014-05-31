define([
    'jquery',
    'underscore',
    'backbone',
    'views/SpendingsView',
    'views/CategoriesView',
    'controllers/SpendingsController',
    'controllers/CategoriesController',
    'controllers/HomeController',
    'date'
], function ($, _, Backbone, SpendingsView, CategoriesView, SpendingsController, CategoriesController, HomeController) {

    var MainRouter = Backbone.Router.extend({
        controllers: {},
        initialize: function () {
            this.controllers.spendingsController = new SpendingsController({router: this})
            this.controllers.categoriesController = new CategoriesController({router: this})
            this.controllers.homeController = new HomeController({router: this})
            this.on('route', function (route) {
                $('header li a').removeClass('active');
                $('header li a').filter('[href="#' + route + '"]').addClass('active');
            })
        },
        routes: {
            '*actions': 'home'
        },
        home: function () {
            this.navigate("#home", {trigger: true});
        }
    });

    return MainRouter
});



