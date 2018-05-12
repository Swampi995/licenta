/**
 * Created by swpmr on 5/12/2018.
 */
import axios from 'axios'

export default class HeaderServices {

    static loadUsers() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/api/users')
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static addUser(user) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/api/users', user)
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}