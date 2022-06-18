import Todo from './Todo';


function TodoList({ todos, user, setRecentlyDeleted }) {


	return (
		<div>
			<h1>Your todos</h1>
			<ul className="list-group">
			{
				todos  ? todos.map(todo => {
					return <Todo todo={todo} key={todo._id} user={user} setRecentlyDeleted={setRecentlyDeleted}/>
			}) : <div>
				Nothing to do {":)"}
				</div>
			}
			</ul>
		</div>
	)
}

export default TodoList;