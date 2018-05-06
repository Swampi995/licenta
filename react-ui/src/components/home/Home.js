/**
 * Created by swpmr on 3/11/2018.
 */
import React, { Component } from 'react'
import { Dialog, FlatButton, GridList, GridTile, Paper } from 'material-ui'
import './style/home.css'
import rooms from './rooms/rooms'
import { Link } from 'react-router-dom'
import AddRoom from './AddRoom'

export default class Home extends Component {

    constructor (props) {
        super(props)
        this.handleOpenAddRoom = this.handleOpenAddRoom.bind(this)
        this.handleCloseAddRoom = this.handleCloseAddRoom.bind(this)
        this.state = {
            open: false
        }
    }

    handleOpenAddRoom = () => {
        this.setState({open: true})
    }

    handleCloseAddRoom = () => {
        this.setState({open: false})
    }

    render () {
        return (
            <div className='roomDivider'>
                <GridList
                    cellHeight={'auto'}
                    cols={3}>
                    {rooms.map((room) => (
                        <GridTile>
                            <Link to={{pathname: '/room', state: {room: room}}}>
                                <Paper className='roomPaper' zDepth={3}>
                                    {room.name}
                                </Paper>
                            </Link>
                        </GridTile>
                    ))
                    }
                    <GridTile>
                        <Paper className='roomPaperAdd' zDepth={0} onClick={this.handleOpenAddRoom}>
                        </Paper>
                    </GridTile>
                </GridList>
                <AddRoom open={this.state.open} handleOpenAddRoom={this.handleOpenAddRoom} handleCloseAddRoom={this.handleCloseAddRoom}/>
            </div>
        )
    }
}