import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

function AddTodo({ user, setTodos }) {
	return (
		<div className='add'>
			<h1>Add Todo</h1>
			<Formik
				initialValues={{ user: user._id, content: '' }}
				validate={values => {
					const errors = {};
					if (!values.content) {
						errors.content = 'Required';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values)
					axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`, values).then((result) => {
						setTodos(result.data.allTodos);
						alert('Todo added!');
					}).catch((error) => {
						alert('Something went wrong');
						console.log(error);
					})
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					
					<Form>
						<div className='form'>
					<div className="form-group">
					<label htmlFor="content">What do u need to do?</label>
						<Field className="form-control" component="textarea" name="content" />
						<ErrorMessage name="content" component="div" />
					</div>
						<button type="submit"className="btn btn-primary"   disabled={isSubmitting}>
							Submit
						</button>
					</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default AddTodo;