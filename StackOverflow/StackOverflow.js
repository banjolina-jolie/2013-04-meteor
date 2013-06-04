Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");
// for each answer add a parent prop that is the id of question
// => answer = {
//  _id
//  parent
//  content
//  date
//  voteValue
// }
//
// To find all answers for a given question:
// Answers.find({ parent: someQuestion._id })


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
      if(Session.get("name")){
        if(new_question){
          Questions.insert({asker: Session.get("name"), content: new_question, score: 0, replies:[]});
        }
      } else {
        alert("You gotta state your name silly!");
      }
    },

    'click input.delete': function(){
      Questions.remove(this._id);
    },

    'click input.vote_up': function(){
      Questions.update(this._id, {$inc: {score: 1}});
    },

    'click input.replyBtn': function(e){
      var reply = $(e.target.parentElement).find('.replyText').val();
      if(Session.get("name")){
        if(reply){
          Questions.update(this._id, {$push: {replies: {answer_score: 0, stuff: reply, answerer: Session.get("name")}}});
        }
      } else{
        alert("You gotta state your name silly!");
      }

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
