define([
    'jquery',
    'underscore',
    'backbone',
    'views/CategoriesView',
    'models/Categories',
    'models/Items',
    'controller',
], function ($, _, Backbone, CategoriesView, Categories, Items) {
    var CategoriesController = Backbone.Controller.extend({
        routes: {
            'categories': 'initData'
        },
        initialize: function () {
        },
        initData: function () {
            var categories = new Categories();
            var items = new Items(),
                self = this;
            items.fetch({
                reset: true,
                success: function (data) {
                    self.categoriesView = new CategoriesView({collection: categories, items: data});
                    categories.fetch({reset: true});
                }
            });

        },
        remove: function () {
            this.categoriesView.remove();
        }
    });

    return CategoriesController;

});
