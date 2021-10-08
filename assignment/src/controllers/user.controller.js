const express = require("express");
const router = express.Router();

const {body, validationResult} = require("express-validator");

const User = require("../models/user.model");


router.post("/",
body("first_name").isLength({min: 2, max : 30}).withMessage("required"),
body("last_name").isLength({min : 2, max : 30}).withMessage("required"),
body("email").isEmail().withMessage("required and Should be a valid email"),
body("pincode").isLength({min : 6, max : 6}).withMessage("required and should be exactly 6 chgaracter"),
body("age").custom(value => {
    if(value >= 1 && value <= 100) {
        return true;
    } else {
        throw new Error("required and should be between 1 and 100");
    }
}),
body("gender").custom(value => {
    if(value == "Male" || value == "Female" || value == "Others") {
        return true;
    } else {
        throw new Error("required and shold be either Male, Female or Others");

    }
    
}),

async(req, res) => {

    const errors = validationResult(req);

    let finalErrors = null;

    if(!errors.isEmpty()) {
        finalErrors = errors.array().map(error => {
            return {
                param : error.param,
                msg : error.msg
            }
        })

        return res.status(400).send({errors : finalErrors});
    }

    try {
        let user = await User.create(req.body);

        res.status(201).send({user}); 
    } catch(err) {
        res.status(400).send({err: err.message});
    }
    
})

module.exports = router;