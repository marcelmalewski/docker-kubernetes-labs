import axios from 'axios';


function Todo({ todo, user, setRecentlyDeleted }) {

	const deleteTodo = (todo) => {
		axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${todo._id}`).then((result) => {
			axios.post(`${process.env.REACT_APP_BACKEND_URL}/recentlyDeleted`, { 'username': user.username, 'content': todo.content }).then(() => {
				setRecentlyDeleted(todo.content);
				alert('Todo deleted');
			}).catch((error) => {
				console.log(error);
				alert('Something went wrong');
			})

		}).catch((error) => {
			console.log(error);
			alert('Something went wrong');
		})
	}
	return (
		<li className="list-group-item">
			<div>
				{todo.content}
			</div>
			<button className="btn btn-primary" onClick={() => deleteTodo(todo)}>delete</button>
		</li>
	)
}

export default Todo;