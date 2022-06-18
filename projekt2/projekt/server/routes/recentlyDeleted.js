const express = require("express");
const router = express.Router({ mergeParams: true });
const client = require("../config/redisClient");

router.get("/", async (req, res) => {
	client
	  .keys("*")
	  .then((result) => {
		return res.send({ result });
	  })
	  .catch(() => {
		res.status(500);
		res.end();
	  });
  });
  
  router.get("/:key", async (req, res) => {
	client
	  .get(req.params.key)
	  .then((result) => {
		if (!result) {
		  res.status(400);
		  res.end();
		} else {
		  return res.send({ result });
		}
	  })
	  .catch(() => {
		res.status(500);
		res.end();
	  });
  });
  
  router.post("/", async (req, res) => {
	client
	  .set(req.body.username, req.body.content)
	  .then(() => {
		return res.send(req.body);
	  })
	  .catch(() => {
		res.status(500).end();
	  });
  });
  
  
  router.delete("/:key", async (req, res) => {
	const key = req.params.key;
	client
	  .del(key)
	  .then((result) => {
		if (result === 1) {
		  return res.send({
			deletedPreference: key,
		  });
		} else {
		  console.log(`${key} does not exist`);
		  res.status(400);
		  res.end();
		}
	  })
	  .catch(() => {
		res.status(500);
		res.end();
	  });
  });
  
  module.exports = router;
  