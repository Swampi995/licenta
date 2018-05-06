/**
 * Created by swpmr on 5/6/2018.
 */
import React, { Component } from 'react'
import { Dialog, RaisedButton, TextField } from 'material-ui'
import axios from 'axios'

export default class Room extends Component {

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.postRoom = this.postRoom.bind(this)
        this.addRoom = this.addRoom.bind(this)
        this.state = {
            name: 'Room',
            seats: 50
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    addRoom () {
        let room = {
            id: 1,
            name: this.state.name,
            seats: this.state.seats,
            calendar: 1,
        }

        this.postRoom(room);
    }

    postRoom (room) {
        axios.post('http://localhost:5000/api/rooms', room)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err)
            })
    }

    render () {
        const actions = [
            <RaisedButton style={{'margin': '12px'}} onClick={this.props.handleCloseAddRoom} secondary>
                Cancel
            </RaisedButton>,
            <RaisedButton style={{'margin': '12px'}} onClick={this.addRoom} primary>
                Submit
            </RaisedButton>
        ]
        return (
            <Dialog
                title="Add Room"
                modal={true}
                actions={actions}
                open={this.props.open}
            >
                <TextField
                    onChange={this.handleChange('name')}
                    value={this.state.name}
                    floatingLabelText="Room Name"
                /><br />
                <TextField
                    onChange={this.handleChange('seats')}
                    value={this.state.seats}
                    floatingLabelText="Seats"
                /><br />
            </Dialog>
        )
    }
}