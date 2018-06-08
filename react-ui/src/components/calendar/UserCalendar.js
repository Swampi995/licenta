import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, FlatButton } from 'material-ui'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class UserCalendar extends React.Component {

    constructor (props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

        this.state = {
            open: false,
            title: ''
        }
    }

    handleOpen = (event) => {
        this.setState({open: true})
        this.setState({title: event.title})
    }

    handleClose = () => {
        this.setState({open: false})
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
                    culture='en-GB'
                    events={this.props.events}
                    step={60}
                    defaultView='week'
                    showMultiDayTimes
                    onSelectEvent={this.handleOpen}
                />
                <Dialog
                    title={this.state.title}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                   STARE
                </Dialog>
            </React.Fragment>
        )
    }
}