const express = require('express');
const router = express.Router();

const User = require('../models/User');


router.get('/', async (req, res) => {
	User.find(
	(err, data) => {
	  if (err) {
		console.log("Error")
	  }
	  else {
		return res.send({
		  allUsers: data
		});
	  }
	}
	);
  });

router.post('/login', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username: username }).then((result) => {
		if (!result) {
			res.status(404);
			res.end();
		}
		else {
			if (result.password = password) {
				res.send(result);
			}

			else {
				res.status(404);
				res.end();
			}
		}
	}).catch(() => {
		res.status(400);
		res.end();
	});
});

router.post('/', async (req, res) => {
	User.create(req.body).then((result) => {
		res.send(result.data);
		res.status(200)
	}).catch((error) => {
		console.log(error)
		res.status(400);
		res.end();
	})
    
});



router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	User.remove({ _id: id }),
		(err) => {
			if (err) {
				console.log(err);
			}
			else {
				return res.send({
					deletedUserId: id
				});
			}
		}
});

module.exports = router;
