define([
    'jquery',
    'underscore',
    'backbone',
    'models/Items',
    'text!templates/category-item.tpl.html'
], function ($, _, Backbone, Items, itemTemplate) {
    var CategoriesItemView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template(itemTemplate),
        events: {
            'click .remove': 'delete',
            'click td.title': 'editTitle',
            'click i.close': 'closeEdit'
        },
        initialize: function (options) {
            this.listenTo(this.model, 'change', this.render);
            this.items = options.parentView.items.where({'categoryId': this.model.get('id')});
            var sum = 0;
            _.each(this.items, function (item) {
                sum += item.get('value');
            })
            //this.model.set('sum', sum)
        },
        delete: function (e) {
            var self = this;
            if (confirm('Все записи этой категории будут удалены, удалить категории?')) {
                this.model.destroy({success: function () {
                    _.each(self.items, function (item) {
                        item.destroy();
                    })
                    self.$el.remove();
                }})
            }
            e.preventDefault();
        },
        editTitle: function () {
            var $title = this.$el.find('.title p'),
                $input = this.$el.find('.title p.edit'),
                self = this;
            $title.hide();
            $input.show();
            $input.focus();
            $input.on('keypress', function (e) {
                if (e.keyCode == 13) {
                    self.model.save({'title': $input.val()});
                    $input.hide();
                    $title.show();
                }
            });
        },
        closeEdit: function (e) {
            e.stopPropagation()
            var $td = $(e.target).closest('.title')
            $td.find('p').show();
            $td.find('p.edit').hide();
        },
        render: function () {
            console.log(this.model.get('budget'))
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.addClass(this.model.get('isIncome') === true ? "item-plus" : "item-minus");
            return this;
        }
    });

    return CategoriesItemView;
});
