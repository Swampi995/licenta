/**
 * Created by swpmr on 3/11/2018.
 */
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import events from './events/events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/home.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Home extends Component {

    render() {
        return (
            <div className='mainCalendar'>
                <BigCalendar
                    culture='en-GB'
                    events={events}
                    step={60}
                    defaultView='week'
                    showMultiDayTimes
                />
            </div>
        );
    }
}