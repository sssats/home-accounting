define([
    'jquery',
    'underscore',
    'backbone',
    'views/HomeView',
    'models/Categories',
    'models/Items',
    'controller'
], function ($, _, Backbone, HomeView, Categories, Items) {
    var HomeController = Backbone.Controller.extend({
        routes: {
            'home': 'initData'
        },
        initialize: function () {
        },
        initData: function () {
            var self = this;
            this.categories = new Categories();
            this.items = new Items();

            this.categories.fetch({
                reset: true,
                success: function (data) {
                    self.items.fetch({
                        reset: true,
                        success: function () {
                            var incomeCategories = data.where({'isIncome': true});
                            var outgoCategories = data.where({'isIncome': false});
                            var income = self.reformatData(incomeCategories);
                            var outgo = self.reformatData(outgoCategories);
                            self.homeView = new HomeView({
                                income: income,
                                outgo: outgo
                            });
                            self.homeView.render();
                        }
                    });
                }
            })
        },
        reformatData: function (categories) {
            var self = this;
            var data = [];
            var ind = 0;
            _.each(categories, function (category) {
                var categorySum = 0,
                    categoryItems = self.items.where({'categoryId': category.id});
                if (categoryItems.length > 0) {
                    _.each(categoryItems, function (item) {
                        categorySum += item.get('value');
                    });
                    data[ind] = [category.get('title'), categorySum];
                    ind++
                }
            });
            return data;
        },
        remove: function () {
            this.homeView.remove();
        }
    });

    return HomeController;

});
