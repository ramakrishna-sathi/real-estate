const router = require("express").Router();
const { Person } = require("../models/user");
const Joi = require("joi");


router.post("/", async (req, res) => {
	
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const person = await Person.findOne({ email: req.body.email });
		if (!person)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = person.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} );

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		userType: Joi.string().required().label("userType"),
	});
	return schema.validate(data);
};

module.exports = router;
