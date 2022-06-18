import { useState, useEffect } from 'react';
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import axios from 'axios';
import '../styles/todos.scss'

function Todos({ user }) {

	const [todos, setTodos] = useState();
	const [recentlyDeleted, setRecentlyDeleted] = useState();
	
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos/${user._id}`).then((result) => {
			setTodos(result.data.allTodos);
			axios.get(`${process.env.REACT_APP_BACKEND_URL}/recentlyDeleted/${user.username}`).then((result) => {
				setRecentlyDeleted(result.data.result)
			}).catch((error) => {
				console.log(error);
			})
	}).catch((error) => {
		console.log(error);
		alert('Unable to download todos');
	})
	}, [user._id]);

	return (
			<div className='container'>
			<div className='list-group-item'>
			<AddTodo user={user} setTodos={setTodos}/>
			</div>
			<div className='list-group-item'>
			<TodoList todos={todos} user={user} setRecentlyDeleted={setRecentlyDeleted}/>
			</div>
			<div className='list-group-item'>
				<h3>
				Recently done...
				</h3>
				<div className="list-group-item">
					{ recentlyDeleted ? recentlyDeleted : null}
				</div>
			</div>
			</div>
	)
}

export default Todos;