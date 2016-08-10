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
        setInterval(this.loadTasksFromServer, this.props.pollInterval);
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

var TodoList = React.createClass({
    handleTaskDelete: function(taskId) {
        $.ajax({
            url: this.props.url + '/' + taskId,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                //this.setState({data: data});
                this.props.loadTasks();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleTaskChange: function (q) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: q,
            success: function(data) {
                this.props.loadTasks();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var handleTaskDelete = this.handleTaskDelete;
        var handleTaskChange = this.handleTaskChange;
        var tasks = this.props.data.map(function (task) {
            return (
                <TodoTask onTaskChange={handleTaskChange} onTaskDelete={handleTaskDelete} id={task._id} status={task.status} task={task.task}>
                </TodoTask>
            );
        });
        return (
            <div className="todoList">
                {tasks}
            </div>
        );
    }
});

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
    render: function() {
        return (
            <form className="todoForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Task"
                    value={this.state.task}
                    onChange={this.handleTaskChange}
                    className="todoCreate"
                />
                <input type="submit" className="todoSubmit" value="Create" />
            </form>
        );
    }
});

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
            </div>
        );
    }
});

ReactDOM.render(
<Todo url="/api/tasks" pollInterval={2000}/>,
    document.getElementById('content')
);