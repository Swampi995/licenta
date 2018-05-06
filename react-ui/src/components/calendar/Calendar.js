/**
 * Created by swpmr on 5/5/2018.
 */
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../calendar/events/events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Calendar extends Component {

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