const User = require('../models/userModel');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    signUp: async function (req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        user.save()
            .then(doc => {
                const response = {
                    "id": doc._id,
                    "email": doc.email
                };
                res.status(201).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err,
                });
            })
    },
    signIn: async function (req, res) {
        User.findOne({email: req.body.email})
            .exec()
            .then(doc => {
                if(doc){
                    if (bcrypt.compareSync(req.body.password, doc.password)) {
                        const token = jwt.sign({doc}, process.env.SECRET, { expiresIn: '72h' });
                        res.status(200).json({
                            _id: doc._id,
			    isAdmin: doc.isAdmin,
                            token: `Barrier ${token}`});
                    }
                }
                res.status(401).json({
                    message: `Incorrect password or email`,
                });

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },


};
