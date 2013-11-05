/*global define*/
/*global Markdown*/
define([
    'underscore',
    'backbone',
    'marionette',
    'text!noteSidebarItemTempl',
    'pagedown-ace'
], function(_, Backbone, Marionette, Template) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: _.template(Template),

        className: 'list-group',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'change:trash', this.remove);
            this.listenTo(this.model, 'shown', this.changeFocus);
        },

        changeFocus: function () {
            this.$('.list-group-item').addClass('active');
        },

        serializeData: function () {
            return _.extend(this.model.toJSON(), {
                page          : this.options.page,
                shownNotebook : this.options.notebookId,
                filter        : this.options.filter
            });
        },

        templateHelpers: function () {
            return {
                getContent: function (text) {
                    // Pagedown
                    var converter = new Markdown.Converter();
                    // var safeConverter = pagedown.getSanitizingConverter();
                    var content = converter.makeHtml(text);
                    content = content.substring(0, 50).replace(/<(?:.|\n)*?>/gm, '');
                    return content;
                },

                getTitle: function (title) {
                    return title.replace(/<(?:.|\n)*?>/gm, '');
                },

                // Generate link
                link: function (id, page, notebook, filter) {
                    var url;

                    switch (filter) {
                        case 'favorite':
                            url = '#/note/favorite/p' + page;
                            break;
                        case 'trashed':
                            url = '#/note/trashed/p' + page;
                            break;
                        default:
                            url = '#/note/' + notebook + '/p' + page;
                            break;
                    }

                    return url + '/show/' + id;
                }
            };
        }

    });

    return View;
});