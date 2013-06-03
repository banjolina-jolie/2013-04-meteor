Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {

  Template.hello.username = function() {
  	return Session.get("name");
  };

  Template.wall.questions = function() {
    return Questions.find();
  };

  Template.wall.events({
    'click input.add': function(){
      var new_question = document.getElementById("new_question").value;
      Questions.insert({asker: Session.get("name"), content: new_question, score: 0, replies:[]});
    },

    'click input.delete': function(){
      Questions.remove(this._id);
    },

    'click input.vote_up': function(){
      Questions.update(this._id, {$inc: {score: 1}});
    },

    'click input.replyBtn': function(){
      Questions.update(this._id, {});
    }

  });

  Template.hello.events({
    'click input.submit_name': function(){
      Session.set("name", document.getElementById("user_name").value);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {

    });
}
