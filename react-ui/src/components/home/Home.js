/**
 * Created by swpmr on 3/11/2018.
 */
import React, { Component } from 'react'
import { GridList, GridTile, Paper } from 'material-ui'
import './style/home.css'
import rooms from './rooms/rooms'
import { Link } from 'react-router-dom'

export default class Home extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='roomDivider'>
        <GridList
          cellHeight={'auto'}
          cols={3}>
          {rooms.map((room) => (
            <Link to={{pathname: '/room', state: {room: room}}}>
              <GridTile>
                <Paper className='roomPaper' zDepth={3}>
                  {room.name}
                </Paper>
              </GridTile>
            </Link>
          ))
          }
        </GridList>
      </div>
    )
  }
}