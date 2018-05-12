/**
 * Created by swpmr on 5/6/2018.
 */
import React from 'react'
import {Divider, List, RaisedButton} from 'material-ui'
import HomeServices from "./api/HomeServices";
import Calendar from "../calendar/Calendar";
import events from "../calendar/events/events";

const Room = (props) => {
    function removeRoomFromHome() {
        HomeServices.removeRoom(props.location.state.room._id).then(() => {
            props.history.push('/');
        });
        HomeServices.removeCalendar(props.location.state.room.name);
    }

    return (
        <div className='room'>
                <div className='roomRoot'>
                    <div className='roomContainer'>
                        <List>
                            <RaisedButton label="Add Event" primary={true}
                                          style={{'margin': '12px', 'marginLeft': '18%'}}/>
                            <RaisedButton label="Invite peoples"
                                          style={{'margin': '12px', 'marginLeft': '18%'}}/>
                        </List>
                        <Divider inset={false}/>
                        <List>
                            <RaisedButton label="Delete" secondary={true} onClick={removeRoomFromHome}
                                          style={{'margin': '12px', 'marginLeft': '18%'}}/>
                        </List>
                    </div>
            </div>
            <div className='roomCalendar'>
                <Calendar events={events}/>
            </div>
        </div>
    )
};

export default Room;