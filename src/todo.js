var React = require('react');
var TodoForm = require('./form');
var TodoList = require('./list');

var Todo = React.createClass({
    loadTasksFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadTasksFromServer();
    },
    handleTaskSubmit: function(task) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: task,
            success: function(data) {
                //this.setState({data: data});
                this.loadTasksFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: tasks});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="todo">
                <TodoForm onTaskSubmit={this.handleTaskSubmit} />
                <TodoList loadTasks={this.loadTasksFromServer} url={this.props.url} data={this.state.data}/>
            </div>
        );
    }
});



module.exports = Todo;



