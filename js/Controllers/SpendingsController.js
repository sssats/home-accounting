define([
    'jquery',
    'underscore',
    'backbone',
    'views/SpendingsView',
    'models/Items',
    'models/Categories',
    'controller',
], function ($, _, Backbone, SpendingsView, Items, Categories) {
    var SpendingsController = Backbone.Controller.extend({
        routes: {
            'spendings': 'initData'
        },
        initialize: function () {
        },
        initData: function () {
            var items = new Items(),
                categories = new Categories();
            this.spendingsView = new SpendingsView({collection: items, categories: categories});
            categories.fetch({
                reset: true,
                success: function(){

                }
            });

        },
        remove: function () {
            this.spendingsView.remove();
        }
    });

    return SpendingsController;

});
