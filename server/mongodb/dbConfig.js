const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/users')
const Room = require('./models/room')
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
    const mongoDB = 'mongodb://swampi:garile@ds259855.mlab.com:59855/your-organizer'
    mongoose.connect(mongoDB)

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    router.route('/users')
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err)
                    res.send(err)
                res.json(users)
            })
        })
        .post(function (req, res) {
            let newUser = new User()
            newUser.user = req.body.user
            newUser.password = req.body.password
            newUser.id = req.body.id
            newUser.save(function (err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'User successfully created'
                })
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
            newRoom.calendar = req.body.calendar
            newRoom.id = req.body.id
            newRoom.save(function (err) {
                if (err)
                    res.send(err)
                res.json({
                    message: 'Room successfully created'
                })
            })
        })
}