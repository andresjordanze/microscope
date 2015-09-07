Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.suscribe('posts'); }
});

Router.route('/', {name: 'postsList'});
