define([
    'backbone',
    'models/Item',
    'dropbox'
], function (Backbone, Item) {

    var Items = Backbone.Collection.extend({
        dropboxDatastore: new Backbone.DropboxDatastore('items'),
        initialize: function () {
            this.dropboxDatastore.syncCollection(this);
        },
        model: Item
    });

    return Items
});