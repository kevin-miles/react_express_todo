var React = require('react');

var TodoForm = React.createClass({
    getInitialState: function() {
        return {task: ''};
    },
    handleTaskChange: function(e) {
        this.setState({task: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var task = this.state.task.trim();
        if (!task) {
            return;
        }
        this.props.onTaskSubmit({task: task});
        this.setState({task: ''});
    },
    _handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    },
    render: function() {
        return (
            <div className="todoAdd inline">
                    <input
                        type="text"
                        placeholder="Task"
                        value={this.state.task}
                        onChange={this.handleTaskChange}
                        onKeyPress={this._handleKeyPress}
                        className="todoCreate form-control"
                    />
                    <button type="button" onClick={this.handleSubmit} className="todoSubmit form-control btn btn-primary">Add Task</button>
            </div>
        );
    }
});

module.exports = TodoForm;