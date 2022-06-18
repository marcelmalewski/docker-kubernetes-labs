import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

function Login({ setUser }) {
	return (
		<div className='login'>
			<h1>Login</h1>
			<Formik
				initialValues={{ username: '', password: '' }}
				validate={values => {
					const errors = {};
					if (!values.username) {
						errors.username = 'Required';
					}
					if (!values.password) {
						errors.password = 'Required'
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, values ).then((result) => {
						setUser(result.data);
						setSubmitting(false);
					}).catch((error) => {
						alert('Something went wrong')
						console.log(error);
						setSubmitting(false);
					})
				}}
			>
				{({ isSubmitting }) => (
					<div>
						<Form>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<Field className="form-control" type="text" name="username" />
								<ErrorMessage name="username" component="div" />
							</div>
							<div>
								<label htmlFor="username">Password</label>
								<Field className="form-control" type="password" name="password" />
								<ErrorMessage name="password" component="div" />
							</div>
							<button type="submit" className="btn btn-primary" disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	)
}

export default Login;