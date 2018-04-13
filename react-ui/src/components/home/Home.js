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
    state = {response: ''};

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res[0].user}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:5000/api/users');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {

        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

        return (
            <div className="mainCalendar">
                <BigCalendar
                    culture='en-GB'
                    events={events}
                    views={allViews}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date(2015, 3, 1)}
                />
            </div>
        );
    }
}