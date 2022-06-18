const express = require("express");
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
	Todo.find(
		(err, data) => {
			if (err) {
				console.log("Error")
			}
			else {
				return res.send({
					allTodos: data
				});
			}
		}
	);
});


router.get('/:userId', async (req, res) => {
	Todo.find(
		{ user: req.params.userId },
		(err, data) => {
			if (err) {
				console.log("Error")
			}
			else {
				return res.send({
					allTodos: data
				});
			}
		}
	);
});



router.post('/', async (req, res) => {
	Todo.create(req.body).then(() => {
		Todo.find(
			{ user: req.body.user },
			(err, data) => {
				if (err) {
					console.log("Error")
				}
				else {

					return res.send({
						allTodos: data
					});
				}
			}
		);

	}).catch((error) => {
		console.log(error)
		res.status(400);
		res.end();
	})

});



router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	Todo.findByIdAndRemove(id, (err, tasks) => {
		if (err) return res.status(500).send(err);
		const response = {
			message: "Todo successfully deleted",
			id: req.params.id
		};
		return res.status(200).send(response);
	});
});

module.exports = router;
