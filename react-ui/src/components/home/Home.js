/**
 * Created by swpmr on 3/11/2018.
 */
import React, { Component } from 'react'
import { GridList, GridTile, Paper } from 'material-ui'
import './style/home.css'
import { Link } from 'react-router-dom'
import AddRoom from './AddRoom'
import HomeService from './api'

export default class Home extends Component {

    constructor (props) {
        super(props)
        this.handleOpenAddRoom = this.handleOpenAddRoom.bind(this)
        this.handleCloseAddRoom = this.handleCloseAddRoom.bind(this)
        this.state = {
            open: false,
            rooms: []
        }
    }

    componentDidMount() {
        HomeService.loadRooms().then((data) => {
            this.setState({rooms: data})
        })
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
                    {this.state.rooms.map((room) => (
                        <GridTile key={room._id}>
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
                <AddRoom rooms={this.state.rooms} loadRooms={this.loadRooms} open={this.state.open} handleOpenAddRoom={this.handleOpenAddRoom} handleCloseAddRoom={this.handleCloseAddRoom}/>
            </div>
        )
    }
}