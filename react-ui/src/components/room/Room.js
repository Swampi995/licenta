/**
 * Created by swpmr on 5/6/2018.
 */
import React, { Component } from 'react'
import { DatePicker, Divider, Drawer, List, RaisedButton, TextField, TimePicker } from 'material-ui'
import RoomsServices from '../../api/RoomsServices'
import Calendar from '../calendar/Calendar'
import events from '../calendar/events/events'
import CalendarServices from '../../api/CalendarServices'
import './style/room.css';

export default class Room extends Component {

    constructor (props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
        this.removeRoomFromHome = this.removeRoomFromHome.bind(this)
        this.state = {open: false}
    }

    handleToggle = () => this.setState({open: !this.state.open})

    removeRoomFromHome () {
        RoomsServices.removeRoom(this.props.location.state.room._id).then(() => {
            this.props.history.push('/')
        })
        CalendarServices.removeCalendar(this.props.location.state.room.name)
    }

    render () {
        return (
            <div className='room'>
                <div className='roomRoot'>
                    <div className='roomContainer'>
                        <List>
                            <RaisedButton label="Add Event" primary={true}
                                          onClick={this.handleToggle}
                                          style={{'margin': '12px', 'marginLeft': '18%'}}/>
                            <RaisedButton label="Invite peoples"
                                          style={{'margin': '12px', 'marginLeft': '18%'}}/>
                        </List>
                        <Divider inset={false}/>
                        <List>
                            <RaisedButton label="Delete" secondary={true} onClick={this.removeRoomFromHome}
                                          style={{'margin': '12px', 'marginLeft': '18%'}}/>
                        </List>
                        <Drawer width={360} docked={false} containerClassName={'roomDrawer'} open={this.state.open}>
                            <TextField
                                hintText="Curs Astronomie"
                                floatingLabelText="Type Event Name"
                            />
                            <br />
                            <br />
                            <DatePicker hintText="Pick Date"/>
                            <br />
                            <TimePicker hintText="Pick Time"/>
                            <br />
                            <div style={{'textAlign': 'end'}}>
                                <RaisedButton className='login-form-button' onClick={this.handleToggle} secondary>
                                    Cancel
                                </RaisedButton>
                                <RaisedButton className='login-form-button' onClick={this.handleToggle} primary>
                                    OK
                                </RaisedButton>
                            </div>
                        </Drawer>
                    </div>
                </div>
                <div className='roomCalendar'>
                    <Calendar events={events}/>
                </div>
            </div>
        )
    }
};