/**
 * Created by swpmr on 5/5/2018.
 */
import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, FlatButton } from 'material-ui'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class Calendar extends React.Component {

    constructor (props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getSumOfPeople = this.getSumOfPeople.bind(this)

        this.state = {
            open: false,
            title: '',
            groupsInvited: []
        }
    }

    handleOpen = (event) => {
        this.setState({open: true})
        this.setState({title: event.title})
        this.setState({groupsInvited: event.groupsInvited})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    getSumOfPeople () {
        let sum = 0
        this.state.groupsInvited.forEach((invitedGroup) => {
            sum = sum + this.props.groups.filter(group => group.name === invitedGroup)[0].users.length
        })
        return sum
    }

    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
        ]

        return (
            <React.Fragment>
                <BigCalendar
                    selectable
                    culture='en-GB'
                    events={this.props.events}
                    step={60}
                    defaultView='month'
                    showMultiDayTimes
                    onSelectEvent={this.handleOpen}
                />
                <Dialog
                    title={this.state.title}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Groups
                    invited: {this.state.groupsInvited ? this.state.groupsInvited.join(', ') : 'There is no one invited to this event'}
                    <br/>
                    Number of people
                    invited: {this.state.groupsInvited && this.state.groupsInvited.length ? this.getSumOfPeople() : 0}
                    <br/>
                    Seats available: {this.props.room.seats}
                </Dialog>
            </React.Fragment>
        )
    }
}
