/**
 * Created by swpmr on 5/28/2018.
 */
import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import { RaisedButton, TableFooter } from 'material-ui'
import UsersServices from '../../api/UsersServices'
import CalendarServices from '../../api/CalendarServices'

export default class Users extends Component {

    constructor (props) {
        super(props)
        this.loadUsers = this.loadUsers.bind(this)
        this.createGroupToggle = this.createGroupToggle.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.handleRowSelection = this.handleRowSelection.bind(this)
        this.deleteSelectedUser = this.deleteSelectedUser.bind(this)
        this.resetSelected = this.resetSelected.bind(this)
        this.changeUserPermission = this.changeUserPermission.bind(this)
        this.state = {
            users: [],
            createGroup: false,
            selected: [],
        }
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1
    }

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        })
    }

    createGroupToggle () {
        this.setState({
            createGroup: !this.state.createGroup
        })
        this.resetSelected()
    }

    componentDidMount () {
        this.loadUsers()
    }

    loadUsers () {
        UsersServices.loadUsers().then((users) => {
            this.setState({users})
        })
    }

    resetSelected() {
        this.setState({selected: []})
    }

    deleteSelectedUser() {
        let user = this.state.users[this.state.selected].user
        UsersServices.deleteUser(user).then(() => {
            CalendarServices.removeCalendar(user)
            this.loadUsers();
            this.resetSelected();
        })
    }

    changeUserPermission() {
        let user = this.state.users[this.state.selected]
        let object = {user: user.user, status: !user.status}
        UsersServices.changeUserPermission(object).then(() => {
            this.loadUsers()
        })
    }

    render () {

        let editUserButtons = (
            <TableRow>
                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                    <RaisedButton className='left-user-button' onClick={this.createGroupToggle}>
                        Create group
                    </RaisedButton>
                </TableRowColumn>
                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                    <RaisedButton className='middle-user-button' disabled={this.state.selected.length === 0} secondary onClick={this.deleteSelectedUser}>
                        Delete
                    </RaisedButton>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton className='left-user-button' primary disabled={this.state.selected.length === 0} onClick={this.changeUserPermission}>
                        Change user permission
                    </RaisedButton>
                </TableRowColumn>
            </TableRow>
        )

        let createGroupButtons = (
            <TableRow>
                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                    <RaisedButton className='left-user-button' onClick={this.createGroupToggle}>
                        Edit users
                    </RaisedButton>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton className='left-user-button' primary>
                        Create group
                    </RaisedButton>
                </TableRowColumn>
            </TableRow>
        )

        return (
            <div>
                <Table
                    height={'500px'}
                    fixedHeader={true}
                    fixedFooter={true}
                    selectable={true}
                    multiSelectable={this.state.createGroup}
                    onRowSelection={this.handleRowSelection}
                >
                    <TableHeader
                        displaySelectAll={true}
                        adjustForCheckbox={true}
                        enableSelectAll={true}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Username">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Is user admin">Admin</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={true}
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {this.state.users.map((row, index) => (
                            <TableRow selected={this.isSelected(index)} key={index}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.user}</TableRowColumn>
                                <TableRowColumn>
                                    {row.status.toString()}
                                </TableRowColumn>
                            </TableRow>
                        ))}

                    </TableBody>
                    <TableFooter>
                        {this.state.createGroup ? createGroupButtons : editUserButtons}
                    </TableFooter>
                </Table>
            </div>
        )
    }
}