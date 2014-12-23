/*** @jsx React.DOM */
'use strict';

var React = require('react');
var moment = require('moment');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function () {
    return {
      questions: []
    };
  },
  createReplies: function (question) {
    if(!question.replies) {
      return [];
    }
    return Object.keys(question.replies)
    .map(function (replyId) {
      var reply = question.replies[replyId];
      return (
        <li key={reply.created} className="reply">
          <span className="timestamp">{moment(reply.created).fromNow()}</span>
          <span className="username">{reply.user}</span>
          <span className="message">{reply.message}</span>
        </li>
      );
    });
  },
  render: function () {
    var self = this;

    var questions = this.state.questions.reverse().map(function (question) {
      var replies = this.createReplies(question);
      return (
        <div key={question.created} className="question">
          <div>
            <span className="timestamp">{moment(question.created).fromNow()}</span>
            <span className="username">{question.user}</span>
            <span className="message">{question.message}</span>
          </div>
          <ul>{replies}</ul>
        </div>
      );
    }, this);

    return (
      <div>
        {questions}
      </div>
    )
  },
  componentWillMount: function () {
    var ref = new Firebase('https://boiling-heat-7286.firebaseio.com/questions');
    this.bindAsArray(ref, 'questions');
  }
});

React.renderComponent(<App />, document.body)
