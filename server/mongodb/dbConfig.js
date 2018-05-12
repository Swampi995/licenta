const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Room = require('./models/room');
const Calendar = require('./models/calendar');
const router = express.Router();

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Cache-Control', 'no-cache');
        next()
    });

    router.get('/', function (req, res) {
        res.json({message: 'API Initialized!'})
    });

    app.use('/api', router);
    const mongoDB = 'mongodb://localhost/your-organizer';
    mongoose.connect(mongoDB);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    router.route('/users')
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err)
                    res.send(err);
                res.json(users)
            })
        })
        .post(function (req, res) {
            let newUser = new User();
            newUser.user = req.body.user;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'User successfully created'
                })
            })
        });
    router.route('/rooms')
        .get(function (req, res) {
            Room.find(function (err, users) {
                if (err)
                    res.send(err);
                res.json(users)
            })
        })
        .post(function (req, res) {
            let newRoom = new Room();
            newRoom.name = req.body.name;
            newRoom.seats = req.body.seats;
            newRoom.calendarID = req.body.calendarID;
            newRoom.save(function (err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Room successfully created'
                })
            })
        })
        .delete(function (req, res) {
            Room.findByIdAndRemove({_id: req.body.id}, function (err, user) {
                if (err)
                    res.send(err);
                res.json({
                    message: user
                })
            })
        });
    router.route('/calendars')
        .get(function (req, res) {
            Calendar.find(function (err, calendars) {
                if (err)
                    res.send(err);
                res.json(calendars)
            })
        })
        .delete(function (req, res) {
            Calendar.findOneAndRemove({name: req.body.name}, function (err, calendar) {
                if (err)
                    res.send(err);
                res.json(calendar)
            })
        })
        .post(function (req, res) {
            let newCalendar = new Calendar();
            newCalendar.name = req.body.name;
            newCalendar.events = req.body.events;
            newCalendar.save(function (err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Calendar successfully created'
                })
            })
        })
};