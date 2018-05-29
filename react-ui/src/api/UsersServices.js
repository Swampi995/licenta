/**
 * Created by swpmr on 5/12/2018.
 */
import axios from 'axios'

export default class UsersServices {

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

    static deleteUser(username) {
        return new Promise((resolve, reject) => {
            axios.delete('http://localhost:5000/api/users', {data: {username: username}})
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

    static requestLogin(username, password) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/api/login', {params: {username: username, password: password}})
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static changeUserPermission(user) {
        return new Promise((resolve, reject) => {
            axios.put('http://localhost:5000/api/users', user)
                .then((response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}