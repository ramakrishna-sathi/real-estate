const router = require("express").Router();
const { Person, validate } = require("../models/user");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const person = await Person.findOne({ email: req.body.email });
		if (person)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		await new Person({ ...req.body }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
