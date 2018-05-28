/**
 * Created by swpmr on 5/13/2018.
 */
import axios from 'axios'

export default class CalendarServices {

    static getCalendar (name) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/api/calendars', {params: {name: name}})
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static removeCalendar (calendarName) {
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

    static postCalendar (calendar) {
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

    static updateEvents (events) {
        return new Promise((resolve, reject) => {
            axios.put('http://localhost:5000/api/events', events)
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}