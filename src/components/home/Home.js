/**
 * Created by swpmr on 3/11/2018.
 */
import React, { Component } from 'react';

class Home extends Component {
  state = {users: []}

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {/*{this.state.users.map(user =>*/}
        {/*<div key={user.id}>{user.username}</div>*/}
        {/*)}*/}
      </div>
    );
  }
}

export default Home;