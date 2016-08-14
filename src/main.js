var React = require('react');

var Todo = require('./todo');

ReactDOM.render(
    <Todo url="/api/tasks"/>,
    document.getElementById('todo')
);