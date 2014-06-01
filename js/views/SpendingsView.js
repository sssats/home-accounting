define([
    'jquery',
    'underscore',
    'backbone',
    'models/Items',
    'models/Categories',
    'views/SpendingItemView',
    'text!templates/spendings.tpl.html',
    'datePicker'
], function ($, _, Backbone, Items, Categories, ItemView, addItemTemplate) {
    var SpendingsView = Backbone.View.extend({
        template: _.template(addItemTemplate),
        tagName: 'div',
        className: 'spendings row',
        contentArea: $('#main-content'),
        events: {
            'click .add-item': 'saveItem'
        },
        initialize: function (options) {
            this.items = options.collection;
            this.categories = options.categories;
            this.listenTo(this.categories, 'reset', this.render);
            this.listenTo(this.items, 'add', this.addOne);
            this.listenTo(this.items, 'reset', this.addAll);
            this.listenTo(this.items, 'remove', this.updateSum);
        },
        addOne: function (item) {
            var category = this.categories.get(item.get('categoryId'));
            var view = new ItemView({
                model: item,
                category: category
            });
            this.$el.find('table.table').append(view.render().el);
            this.updateSum();
        },
        addAll: function () {
            /*this.items.each(function(item){
             item.destroy();
             })*/
            this.$el.find('table.table').html('');
            this.items.each(this.addOne, this);
        },
        saveItem: function () {
            var title = this.$el.find('#title').val();
            var val = this.$el.find('#item').val();
            var category = this.categories.get(this.$el.find('option:selected').data('categoryId'));
            var date = this.$el.find('#date').val() == '' ? $.format.date(new Date(), 'dd/MM/yy') : this.$el.find('#date').val();
            if (val !== '') {
                this.items.create({
                    title: title,
                    value: parseInt(val),
                    categoryId: category.get('id'),
                    created: date
                });
            }
        },
        updateSum: function () {
            var self = this;
            this.sum = 0;
            _.each(this.items.models, function (item) {
                self.sum += self.categories.get(item.get('categoryId')).get('isIncome') === true ? item.get('value') : -item.get('value');
            });
            this.$el.find('.total-sum b').html(this.sum);
        },
        render: function () {
            this.contentArea.html(this.$el.html(this.template({categories: this.categories.models})));
            $('#date').pickmeup({
                format: 'd/m/y',
                change: function(){
                    $(this).pickmeup('hide');
                }
            });
            this.items.fetch({reset: true});
            return this;
        }
    });

    return SpendingsView;
});

