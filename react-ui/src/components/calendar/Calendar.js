/**
 * Created by swpmr on 5/5/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const Calendar = (props) => {
    return (
        <BigCalendar
            culture='en-GB'
            events={props.events}
            step={60}
            defaultView='month'
            showMultiDayTimes
        />
    );
};

Calendar.propTypes = {
    events: PropTypes.array
};

export default Calendar;