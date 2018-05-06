/**
 * Created by swpmr on 5/6/2018.
 */
import React, { Component } from 'react'

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      room: this.props.location.state.room
    }
  }

  render () {
    return (
      <div>
        {this.state.room.name}
      </div>
    )
  }
}