const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Room = require('./models/room')
const Calendar = require('./models/calendar')
const Group = require('./models/group')
const router = express.Router()

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Cache-Control', 'no-cache')
        next()
    })

    router.get('/', function (req, res) {
        res.json({message: 'API Initialized!'})
    })

    app.use('/api', router)
    const mongoDB = 'mongodb://localhost/your-organizer'
    mongoose.connect(mongoDB)

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    router.route('/users')
        .get(function (req, res) {
            User.find({}, {'_id': 1, 'user': 1, 'status': 1, 'group': 1}, function (err, users) {
                if (err)
                    res.send(err)
                res.json(users)
            })
        })
        .post(function (req, res) {
            let newUser = new User()
            newUser.user = req.body.user
            newUser.password = req.body.password
            newUser.status = false
            newUser.group = []
            newUser.save(function (err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'User successfully created'
                })
            })
        })
        .delete(function (req, res) {
            User.findOneAndRemove({user: req.body.username}, function (err, user) {
                if (err)
                    res.send(err)
                res.json(user)
            })
        })
    router.route('/users/updatePermission')
        .put(function (req, res) {
            User.findOneAndUpdate({user: req.body.user}, {$set: {status: req.body.status}}, {new: true}, function (err, user) {
                if (err)
                    res.send(err)
                res.json(user)
            })
        })
    router.route('/users/updateGroup')
        .put(function (req, res) {
            User.findOneAndUpdate({user: req.body.user}, {$set: {group: req.body.group}}, {new: true}, function (err, user) {
                if (err)
                    res.send(err)
                res.json(user)
            })
        })
    router.route('/login')
        .get(function (req, res) {
            User.find({user: req.query.username, password: req.query.password}, function (err, users) {
                if (err)
                    res.send(err)
                res.json(users)
            })
        })
    router.route('/rooms')
        .get(function (req, res) {
            Room.find(function (err, users) {
                if (err)
                    res.send(err)
                res.json(users)
            })
        })
        .post(function (req, res) {
            let newRoom = new Room()
            newRoom.name = req.body.name
            newRoom.seats = req.body.seats
            newRoom.calendarID = req.body.calendarID
            newRoom.save(function (err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'Room successfully created'
                })
            })
        })
        .delete(function (req, res) {
            Room.findByIdAndRemove({_id: req.body.id}, function (err, user) {
                if (err)
                    res.send(err)
                res.json({
                    message: user
                })
            })
        })
    router.route('/calendars')
        .get(function (req, res) {
            Calendar.findOne({name: req.query.name}, function (err, calendars) {
                if (err)
                    res.send(err)
                res.json(calendars)
            })
        })
        .delete(function (req, res) {
            Calendar.findOneAndRemove({name: req.body.name}, function (err, calendar) {
                if (err)
                    res.send(err)
                res.json(calendar)
            })
        })
        .post(function (req, res) {
            let newCalendar = new Calendar()
            newCalendar.name = req.body.name
            newCalendar.events = req.body.events
            newCalendar.save(function (err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'Calendar successfully created'
                })
            })
        })
    router.route('/events')
        .put(function (req, res) {
            Calendar.findOneAndUpdate({name: req.body.name}, {$set: {events: req.body.events}}, {new: true}, function (err, calendar) {
                if (err)
                    res.send(err)
                res.json(calendar)
            })
        })
    router.route('/groups')
        .post(function (req, res) {
            let newGroup = new Group()
            newGroup.name = req.body.name
            newGroup.users = req.body.users
            newGroup.save(function (err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'Group successfully created'
                })
            })
        })
        .get(function (req, res) {
            Group.find(function (err, groups) {
                if (err)
                    res.send(err)
                res.json(groups)
            })
        })
}