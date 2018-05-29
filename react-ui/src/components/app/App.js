import React from 'react'
import Main from '../main/Main'
import Header from '../header/Header'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false
        };
        this.changeLoginState = this.changeLoginState.bind(this);
    }

    changeLoginState(value) {
        this.setState({logged: value})
    }

    render() {
        return (
            <div>
                <Header logged={this.state.logged} changeLoginState={this.changeLoginState}/>
                {/*{this.state.logged ? <Main/> : null}*/}
                <Main/>
            </div>
        )
    }
}

