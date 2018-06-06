/**
 * Created by swpmr on 5/6/2018.
 */
import React, { Component } from 'react'
import {
    Divider, Drawer, List, MenuItem, RaisedButton, SelectField, Table, TableBody, TableRow, TableRowColumn,
    TextField
} from 'material-ui'
import DateTimePicker from 'material-ui-datetimepicker'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog'
import RoomsServices from '../../api/RoomsServices'
import Calendar from '../calendar/Calendar'
import CalendarServices from '../../api/CalendarServices'
import './style/room.css'
import UsersServices from '../../api/UsersServices'

export default class Room extends Component {

    constructor (props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
        this.removeRoomFromHome = this.removeRoomFromHome.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleAddEvent = this.handleAddEvent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addHours = this.addHours.bind(this)
        this.loadCalendar = this.loadCalendar.bind(this)
        this.handleToggleInvitePeople = this.handleToggleInvitePeople.bind(this)
        this.handleInviteGroups = this.handleInviteGroups.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.handleRowSelection = this.handleRowSelection.bind(this)
        this.handleChangeEvent = this.handleChangeEvent.bind(this)
        this.state = {
            events: [],
            groups: [],
            calendar: '',
            open: false,
            eventName: '',
            eventDate: '',
            eventLength: '',
            openInvitePeople: false,
            selected: [],
            valueEvent: 0
        }
    }

    componentDidMount () {
        this.loadCalendar()
        this.loadGroups()
    }

    loadGroups () {
        UsersServices.loadGroups().then((groups) => {
            this.setState({groups})
        })
    }

    loadCalendar () {
        CalendarServices.getCalendar(this.props.location.state.room.name).then((calendar) => {
            this.setState({calendar})
            let parsedEvents = calendar.events.map(event => {
                let parsedEvent = {
                    id: event.id,
                    title: event.title,
                    start: new Date(event.start),
                    end: new Date(event.end)
                }
                return parsedEvent
            })
            this.setState({events: parsedEvents})
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleChangeEvent = (event, index, valueEvent) => this.setState({valueEvent})

    handleToggle = () => this.setState({open: !this.state.open})

    handleToggleInvitePeople = () => this.setState({openInvitePeople: !this.state.openInvitePeople})

    handleChangeDate = (date) => {
        this.setState({
            eventDate: date,
        })
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1
    }

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        })
    }

    removeRoomFromHome () {
        RoomsServices.removeRoom(this.props.location.state.room._id).then(() => {
            this.props.history.push('/')
        })
        CalendarServices.removeCalendar(this.props.location.state.room.name)
    }

    addHours () {
        let date = new Date(this.state.eventDate)
        date.setTime(date.getTime() + (parseInt(this.state.eventLength, 10) * 60 * 60 * 1000))
        return date
    }

    handleAddEvent () {
        let lastEvents = this.state.calendar.events
        let events = [...lastEvents, {
            id: lastEvents.length + 1,
            title: this.state.eventName,
            start: this.state.eventDate,
            end: this.addHours()
        }]
        let object = {name: this.props.location.state.room.name, events: events}
        CalendarServices.updateEvents(object).then(() => {
            this.loadCalendar()
        })
        this.handleToggle()
    }

    handleInviteGroups () {
        this.state.selected.forEach((index) => {
            let group = this.state.groups[index]
            group.users.forEach((user) => {
                CalendarServices.getCalendar(user.user).then((calendar) => {
                        let lastEvents = calendar.events
                        let events = [...lastEvents, {
                            id: lastEvents.length + 1,
                            title: this.state.events[this.state.valueEvent].title,
                            start: this.state.events[this.state.valueEvent].start,
                            end: this.state.events[this.state.valueEvent].end
                        }]
                        let object = {name: user.user, events: events}
                        CalendarServices.updateEvents(object)
                    }
                )
            })
        })
        this.handleToggleInvitePeople()
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
                            <RaisedButton label="Invite people"
                                          onClick={this.handleToggleInvitePeople}
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
                                onChange={this.handleChange('eventName')}
                            />
                            <br />
                            <br />
                            <TextField
                                hintText="2"
                                floatingLabelText="Type length in hours of the event"
                                onChange={this.handleChange('eventLength')}
                            />
                            <br />
                            <br />
                            <DateTimePicker
                                floatingLabelText="Pick a date"
                                onChange={this.handleChangeDate}
                                DatePicker={DatePickerDialog}
                                TimePicker={TimePickerDialog}
                            />
                            <br />
                            <div style={{'textAlign': 'end'}}>
                                <RaisedButton className='login-form-button' onClick={this.handleToggle} secondary>
                                    Cancel
                                </RaisedButton>
                                <RaisedButton className='login-form-button' onClick={this.handleAddEvent} primary>
                                    OK
                                </RaisedButton>
                            </div>
                        </Drawer>
                        <Drawer width={360} docked={false} containerClassName={'roomDrawer'}
                                open={this.state.openInvitePeople}>
                            <div style={{'textAlign': 'end'}}>
                                <SelectField
                                    hintText="Select an event"
                                    value={this.state.valueEvent}
                                    onChange={this.handleChangeEvent}
                                >
                                    {this.state.events.map((event, index) => (
                                        <MenuItem key={index} value={index} primaryText={event.title}/>
                                    ))}
                                </SelectField>
                                <Table
                                    height={'500px'}
                                    fixedHeader={true}
                                    fixedFooter={true}
                                    selectable={true}
                                    multiSelectable={true}
                                    onRowSelection={this.handleRowSelection}
                                >
                                    <TableBody
                                        displayRowCheckbox={true}
                                        deselectOnClickaway={false}
                                        showRowHover={true}
                                        stripedRows={false}
                                    >
                                        {this.state.groups.map((row, index) => (
                                            <TableRow selected={this.isSelected(index)} key={index}>
                                                <TableRowColumn>{index}</TableRowColumn>
                                                <TableRowColumn>{row.name}</TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <RaisedButton className='login-form-button' onClick={this.handleToggleInvitePeople}
                                              secondary>
                                    Cancel
                                </RaisedButton>
                                <RaisedButton className='login-form-button' onClick={this.handleInviteGroups} primary>
                                    Invite
                                </RaisedButton>
                            </div>
                        </Drawer>
                    </div>
                </div>
                <div className='roomCalendar'>
                    <Calendar events={this.state.events}/>
                </div>
            </div>
        )
    }
};