/**
 * Created by swpmr on 5/6/2018.
 */
import React, {Component} from 'react'
import {Dialog, RaisedButton, TextField} from 'material-ui'
import RoomsServices from "../../api/RoomsServices";
import CalendarServices from '../../api/CalendarServices'

export default class AddRoom extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.createNewRoom = this.createNewRoom.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.state = {
            name: 'Room',
            seats: 50,
            errorText: ''
        }
    }

    handleChange = name => event => {
        this.setErrorMessage('');
        this.setState({
            [name]: event.target.value,
        })
    };

    setErrorMessage(message) {
        this.setState({errorText: message})
    }

    addRoom() {
        let roomName = this.props.rooms.filter(room => room.name === this.state.name);
        if (roomName.length === 0) {
            let room = {
                name: this.state.name,
                seats: this.state.seats,
            };

            let calendar = {
                name: this.state.name,
                events: [],
            };

            this.createNewRoom(room, calendar);
            this.props.handleCloseAddRoom();
        }
        else {
            this.setErrorMessage('Room name already exists!');
        }

    }

    createNewRoom(room, calendar) {
        CalendarServices.postCalendar(calendar);
        RoomsServices.postRoom(room).then(() => {
            this.props.loadRooms();
        })
    }

    render() {
        const actions = [
            <RaisedButton style={{'margin': '12px'}} onClick={this.props.handleCloseAddRoom} secondary>
                Cancel
            </RaisedButton>,
            <RaisedButton style={{'margin': '12px'}} onClick={this.addRoom} primary>
                Submit
            </RaisedButton>
        ];
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
                    errorText={this.state.errorText}
                    floatingLabelText="Room Name"
                /><br/>
                <TextField
                    onChange={this.handleChange('seats')}
                    value={this.state.seats}
                    floatingLabelText="Seats"
                /><br/>
            </Dialog>
        )
    }
}