import { useState } from 'react';
import Login from './components/Login'
import Navbar from './components/Navbar';
import Todos from './components/Todos'
import './styles/app.scss'


function App() {

	const [user, setUser] = useState();

	if (!user) {
		return (
		<div className='app'>
			<Login setUser={setUser} />;
		</div>
		)
	}

	return (
		
		<div>
			<Navbar user={user}/>
			<Todos user={user} />
		</div>
	);
}

export default App;
