define([
    'jquery',
    'underscore',
    'backbone',
    'models/Items',
    'text!templates/spending-item-plus.tpl.html',
    'text!templates/spending-item-minus.tpl.html'
], function ($, _, Backbone, Items, itemTemplatePlus, itemTemplateMinus) {
    var SpendingItemView = Backbone.View.extend({
        tagName: 'tr',
        events: {
            'click .remove': 'delete'
        },
        initialize: function (options) {
            this.data = {
                created: options.model.get('created'),
                value: options.model.get('value'),
                categoryName: options.category.get('title'),
                icon: options.category.get('icon')
            }
            if (options.category.get('isIncome') == true) {
                this.data.className = 'item-plus';
                this.template = _.template(itemTemplatePlus);

            } else {
                this.data.className = 'item-minus';
                this.template = _.template(itemTemplateMinus);
            }

        },
        delete: function (e) {
            var self = this;
            this.model.destroy({success: function () {
                self.$el.remove();
            }});
            e.preventDefault();
        },
        render: function () {
            this.$el.append(this.template(this.data));
            this.$el.addClass(this.data.className);
            return this;
        }
    });

    return SpendingItemView;
});
