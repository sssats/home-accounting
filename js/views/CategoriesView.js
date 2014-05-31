define([
    'jquery',
    'underscore',
    'backbone',
    'models/Categories',
    'views/CategoriesItemView',
    'text!templates/categories.tpl.html'
], function ($, _, Backbone, Categories, ItemView, categoriesTemplate) {
    var CategoriesView = Backbone.View.extend({
        template: _.template(categoriesTemplate),
        tagName: 'div',
        className: 'categories row',
        contentArea: $('#main-content'),
        events: {
            'click .add-item': 'addItem',
            'click li.icon': 'selectIcon'
        },

        initialize: function (options) {
            this.collection = options.collection;
            this.items = options.items;
            this.render();
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
        },
        selectIcon: function (e) {
            this.$el.find('.category-icons li').removeClass('active');
            $(e.currentTarget).addClass('active')
            this.selectedIcon = $(e.currentTarget).find('i').attr('class');
        },
        addOne: function (item) {
            var view = new ItemView({model: item, parentView: this});
            this.$el.find('table.table').append(view.render().el);
        },
        addAll: function () {
            this.$el.find('table.table').html('');
            this.collection.each(this.addOne, this);
        },
        render: function () {
            this.contentArea.html(this.$el.html(this.template()));
            return this;
        },
        addItem: function () {
            var title = this.$el.find('#title').val();
            var isIncome = this.$el.find("input[name='isIncome']:checked").val() === "true" ? true : false;
            if (title !== '' && isIncome !== null) {
                this.collection.create({
                    title: title,
                    isIncome: isIncome,
                    icon: this.selectedIcon
                });

            }
        }
    });

    return CategoriesView;
});
