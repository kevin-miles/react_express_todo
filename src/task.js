var React = require('react');

var TodoTask = React.createClass({
    getInitialState: function() {
        return {task: this.props.task, status: this.props.status, id: this.props.id};
    },
    handleDelete: function(e) {
        e.preventDefault();
        var taskId = e.target.getAttribute("data-id");
        this.props.onTaskDelete(taskId);
    },
    handleTaskChange: function(e) {
        var taskId = e.target.getAttribute("data-id");
        var task = e.target.value;
        var status = e.target.getAttribute("data-status");
        var query = {taskId: taskId, task: task, status: status};
        this.setState({task: e.target.value});
        this.props.onTaskChange(query);
    },
    render: function() {
        return (
            <div className="taskContainer">
                <input
                    data-id={this.state.id}
                    data-status={this.state.status}
                    type="text"
                    className="task"
                    value={this.state.task}
                    onChange={this.handleTaskChange}
                />
                <form data-id={this.state.id} className="todoFormDelete" onSubmit={this.handleDelete}>
                    <input className="delete" type="submit" value="Delete" />
                </form>
                <form data-id={this.state.id} className="todoFormStatus" onSubmit={this.handleStatusChange}>
                    <input className="status" type="submit" value="To Do" />
                </form>
            </div>
        );
    }
});

module.exports = TodoTask;
