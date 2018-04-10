/**
 * Created by swpmr on 3/11/2018.
 */
import React, {Component} from 'react';

class Home extends Component {
    state = {response: ''}

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div className="App">
                <h1>Response</h1>
                {this.state.response}
            </div>
        );
    }
}

export default Home;