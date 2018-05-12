/**
 * Created by swpmr on 5/6/2018.
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Divider, List, ListItem, RaisedButton } from 'material-ui'

export default class Room extends Component {

    constructor (props) {
        super(props)
        this.removeRoom = this.removeRoom.bind(this)
        this.removeCalendar = this.removeCalendar.bind(this)
        this.state = {
            room: this.props.location.state.room
        }
    }

    removeRoom () {
        axios.delete('http://localhost:5000/api/rooms', {data: {id: this.state.room._id}})
            .then(res => {
                this.props.history.push('/')
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    removeCalendar () {
        axios.delete('http://localhost:5000/api/calendars', {data: {name: this.state.room.name}})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    render () {
        return (
            <div className='roomRoot'>
                <div className='roomContainer'>
                    <List>
                        <ListItem insetChildren={true} primaryText="Janet Perkins Bennet"/>
                        <ListItem insetChildren={true} primaryText="Aaron Bennet"/>
                        <ListItem insetChildren={true} primaryText="Abbey Christensen"/>
                    </List>
                    <Divider inset={true}/>
                    <List>
                        <RaisedButton label="Delete" secondary={true} onClick={() => {
                            this.removeRoom();
                            this.removeCalendar();
                        }}
                                      style={{'margin': '12px', 'marginLeft': '18%'}}/>
                    </List>
                </div>
            </div>
        )
    }
}