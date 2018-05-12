/**
 * Created by swpmr on 5/6/2018.
 */
import React, {Component} from 'react'
import {Divider, List, ListItem, RaisedButton} from 'material-ui'
import HomeServices from "./api/HomeServices";

export default class Room extends Component {

    constructor(props) {
        super(props);
        this.removeRoomFromHome = this.removeRoomFromHome.bind(this);
        this.state = {
            room: this.props.location.state.room
        }
    }

    removeRoomFromHome() {
        HomeServices.removeRoom(this.state.room._id).then(() => {
            this.props.history.push('/');
        });
        HomeServices.removeCalendar(this.state.room.name);
    }

    render() {
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
                        <RaisedButton label="Delete" secondary={true} onClick={this.removeRoomFromHome}
                                      style={{'margin': '12px', 'marginLeft': '18%'}}/>
                    </List>
                </div>
            </div>
        )
    }
}