/**
 * Created by swpmr on 5/12/2018.
 */
import axios from 'axios'

export default class HomeService {

    static loadRooms () {
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
}