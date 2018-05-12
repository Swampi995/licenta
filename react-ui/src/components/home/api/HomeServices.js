/**
 * Created by swpmr on 5/12/2018.
 */
import axios from 'axios'

export default class HomeServices {

    static loadRooms() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/api/rooms')
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static removeRoom(roomID) {
        return new Promise((resolve, reject) => {
            axios.delete('http://localhost:5000/api/rooms', {data: {id: roomID}})
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static removeCalendar(calendarName) {
        return new Promise((resolve, reject) => {
            axios.delete('http://localhost:5000/api/calendars', {data: {name: calendarName}})
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static postCalendar(calendar) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/api/calendars', calendar)
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static postRoom(room) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/api/rooms', room)
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}