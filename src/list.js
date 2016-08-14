var React = require('react');

var TodoList = React.createClass({
    handleTaskDelete: function(e) {
        e.preventDefault();
        var taskId = e.target.getAttribute("data-id");
        $.ajax({
            url: this.props.url + '/' + taskId,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                this.props.loadTasks();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleTaskChange: function (e) {
        var taskId = e.target.getAttribute("data-id");
        var task = e.target.value;
        var status = e.target.getAttribute("data-status");
        var query = {taskId: taskId, task: task, status: status};
        this.setState({task: task});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: query,
            success: function(data) {
                this.props.loadTasks();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleTaskStatus: function (e) {
        var taskId = e.target.getAttribute("data-id");
        var task = e.target.getAttribute("data-task");
        var status = e.target.getAttribute("data-status");
        if(status === 'todo') {
            status = 'done';
        } else {
            status= 'todo';
        }
        var query = {taskId: taskId, task: task, status: status};
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: query,
            success: function(data) {
                this.props.loadTasks();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.setState({task: task});
    },
    render: function() {
        var handleTaskDelete = this.handleTaskDelete;
        var handleTaskChange = this.handleTaskChange;
        var handleTaskStatus = this.handleTaskStatus;
        if (this.props.data.length > 0){
            var tasks = this.props.data.map(function (task) {
                var disabled = '';
                if (task.status !== 'todo'){
                    disabled = 'disabled';
                }
                return (
                    <div className="taskContainer">
                        <form className="form form-inline" role="form">
                            <div className="row">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-1">
                                            <button data-id={task._id} data-status={task.status} onClick={handleTaskDelete} className="btn btn-danger delete inline" aria-label="Delete" type="button">
                                                ✖
                                            </button>
                                        </div>

                                        <div className="col-xs-12 col-md-10">
                                            <input
                                                type="text"
                                                className="form-control task"
                                                value={task.task}
                                                data-id={task._id}
                                                data-status={task.status}
                                                onChange={handleTaskChange}
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="col-xs-12 col-md-1">
                                            <button data-id={task._id} data-task={task.task} data-status={task.status} onClick={handleTaskStatus} className="btn btn-success toggle inline" aria-label="Toggle" type="button">
                                                ✔
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                );
            });
        }

        return (
            <div className="todoList">
                {tasks}
            </div>
        );
    }
});

module.exports = TodoList;