const Ticket = require('../models/ticketModel.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//const enshureTimeInterval = require('../libs/enshureTimeInterval');
module.exports = {
    addTicket: async function(req, res) {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            const decodedJwt = jwt.decode(req.token, { complete: true });
            const ticket = new Ticket({
                _id: new mongoose.Types.ObjectId(),
                hall_id: req.body.hall_id,
                user_id: decodedJwt.payload.doc._id,
                from: req.body.from,
                to: req.body.to,
                title: req.body.title
            });
            const compareFrom = req.body.from;
            const compareTo = req.body.to;
            Ticket.find({ hall_id: req.body.hall_id })
                .exec()
                .then(docs => {
                    if (docs) {
                        for (let i = 0; i < docs.length; i++) {
                            if (docs[i].from <= compareTo && compareFrom <= docs[i].to) {
                                return res.status(400).json({ message: "Busy!!!" });
                            }
                        }
                        ticket.save()
                            .then(doc => {
                                res.status(201).json(doc);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: err,
                                });
                            });

                    } else {
                        ticket.save()
                            .then(doc => {
                                res.status(201).json(doc);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: err,
                                });
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    },
    deleteTicket: async function(req, res) {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            const decodedJwt = jwt.decode(req.token, { complete: true });
            Ticket.deleteOne({ user_id: decodedJwt.payload.doc._id, _id: req.params.id })
                .exec()
                .then(doc => {
                    if (doc) {
                        res.status(200).json(doc);
                    }
                    res.status(403).send("No authority");
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });


        });
    },
    getAlltickets: async function(req, res) {

        Ticket.find()
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },
    getTicketsWithParams: async function(req, res) {

        const from = req.params.from;
        const to = req.params.to;
        Ticket.find({ from: { $gte: from }, to: { $lte: to } })
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    },
    deleteall: async function(req, res) {
        Ticket.collection.drop();
        await res.status(200).json({ message: "Tickets collection dropped!" });


    },
    updateTicket: async function(req, res) {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }

            const decodedJwt = jwt.decode(req.token, { complete: true });
            const updateObj = new Object({ ...req.body });
            // console.log(updateObj);
            
            // for (let key in updateObj) {
            //     if (updateObj[key] == null) {
            //         res.status(400).json({message: "You have to update all fields in ticket object!!"});
            //     }
            // }

            // const nullValues = Object.values(updateObj).find(value => Boolean(value) === false);
            if(!updateObj.hasOwnProperty('from') || !updateObj.hasOwnProperty('to') || !updateObj.hasOwnProperty('title') ){
                return res.status(400).json({ message: "You have to update all fields in ticket object!!" });
            }
            // const updateObj = {
            //     from: req.body.from,
            //     to: req.body.to,
            //     title: req.body.title
            // };
            const nullValues = Object.values(updateObj).includes('');


            if (nullValues) {
                return res.status(400).json({ message: "You have to update all fields in ticket object!!" });

            }

            Ticket.updateOne({ user_id: decodedJwt.payload.doc._id, _id: req.params.id }, updateObj)
                .exec()
                .then(doc => {
                    if (doc.nModified != 0) {
                        Ticket.find({ _id: req.params.id })
                            .exec()
                            .then(docs => {
                                res.status(200).json(docs);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    },



};