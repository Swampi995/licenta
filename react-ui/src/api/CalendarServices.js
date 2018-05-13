/**
 * Created by swpmr on 5/13/2018.
 */
import axios from 'axios'

export default class CalendarServices {

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
}