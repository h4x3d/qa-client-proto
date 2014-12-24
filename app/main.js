/*** @jsx React.DOM */
'use strict';

var React = require('react');

var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var Question = require('components/question');

var App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function () {
    return {
      questions: []
    };
  },
  render: function () {
    var questions = this.state.questions.reverse().map(function (question) {
      return <Question question={question} />;
    });

    return <div>{questions}</div>;
  },
  componentWillMount: function () {
    var ref = new Firebase('https://boiling-heat-7286.firebaseio.com/questions');
    this.bindAsArray(ref, 'questions');
  }
});

React.renderComponent(<App />, document.body)
