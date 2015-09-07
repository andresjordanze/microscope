Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.suscribe('posts'); }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {  
	name: 'postPage',  
	data: function() { 
		return Posts.findOne(this.params._id); 
	}
});