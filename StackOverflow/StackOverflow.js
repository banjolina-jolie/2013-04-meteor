Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {

  Template.wall.questions = function() {
    return Questions.find();
  };

  Template.wall.events({
    'click input.add': function(){
      var new_question = document.getElementById("new_question").value;
      Questions.insert({content: new_question, score: 0});
    },

    'click input.delete': function(){
      Questions.remove(this._id);
    },

    'click input.vote_up': function(){
      Questions.update(this._id, {$inc: {score: 1}});
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
