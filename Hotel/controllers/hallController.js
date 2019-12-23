const Hall = require('../models/hallModel.js');
const mongoose = require('mongoose');
const fs = require("fs");
const jwt = require('jsonwebtoken');

module.exports = {
    addHall:async function(req, res) {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            const hall = new Hall({
                _id: new mongoose.Types.ObjectId(),
                ...req.body
            });
            hall.save()
                .then(doc => {
                    res.status(201).json(doc);
                    fs.readFile("./seeders/halls.json", "utf8", function (err, data) {
                        if (err) console.log(err);
                        let users = JSON.parse(data);
                        doc.password =
                            users.push(JSON.stringify(doc));
                        fs.writeFile("./seeders/halls.json", JSON.stringify(users), function (err, data) {
                            if (err) console.log(err);
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        errors: err,
                    });
                })
        });
    },
    getAllHalls: async function(req,res){

            Hall.find()
                .exec()
                .then(docs => {
                    const response = {
                        count: docs.length,
                        halls: docs.map(doc => {
                            return {
                                title: doc.title,
                                description: doc.description,
                                _id: doc._id,
                                imageURL: doc.imageURL,
                            };
                        })
                    };
                    if (docs.length > 0) {
                        res.status(200).json(response);
                    } else {
                        res.status(404).json({
                            message: `DB is empty`,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

    },
    deleteHall: async function(req,res){
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            Hall.deleteOne({_id: req.params.id})
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    },
    test: async function(req,res) {
        Hall.updateMany({title: "Book conference room for 100 people in Chambéry"}, {title: "Book conference room for 100 people in Chambery"})
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
    },

};