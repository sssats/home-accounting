define([
    'backbone',
    'models/Category',
    'dropbox'
], function (Backbone, Category) {

    var Categories = Backbone.Collection.extend({
        dropboxDatastore: new Backbone.DropboxDatastore('Categories'),
        initialize: function () {
            this.dropboxDatastore.syncCollection(this);
        },
        model: Category
    });

    return Categories
});