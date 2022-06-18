function Navbar({ user }) {
	return (
		<nav className="navbar navbar-dark bg-primary">
  <div className="container-fluid">
    <div className="navbar-brand">Hello {user.username}!</div>
  </div>
</nav>
	)
}

export default Navbar;