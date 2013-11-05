/*global define */
define(['app', 'marionette', 'controllers/main'], function(App, Marionette, Controller){
    'use strict';

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            ''                                  :  'index',
            // Routes for notes                 :
            'note/add'                          :  'noteAdd',
            'note/edit/:id'                     :  'noteEdit',
            'note/remove/:id'                   :  'noteRemove',
            'note/show/:id'                     :  'noteShow',
            // Favorite notes                   :
            'note/favorite/p:page'              :  'noteFavorite',
            'note/favorite/p:page/show/:id'     :  'noteFavorite',
            // Trashed notes                    :
            'note/trashed/p:page'               :  'noteTrashed',
            'note/trashed/p:page/show/:id'      :  'noteTrashed',
            // Notes with pagination            :
            'note/:notebook/p:page/show/:id'    :  'noteShow',
            'note/:notebook/p:page'             :  'noteInit',
            // Notebooks routes                 :
            'notebook/add'                      :  'notebookAdd',
            'notebook/edit/:id'                 :  'notebookEdit',
            'notebook/remove/:id'               :  'notebookRemove',
            'notebook/:id'                      :  'notebook'
        },

        controller: new Controller()
    });

    return Router;
});