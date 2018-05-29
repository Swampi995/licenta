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
import { Dialog, RaisedButton, TableFooter, TextField } from 'material-ui'
import UsersServices from '../../api/UsersServices'
import CalendarServices from '../../api/CalendarServices'

export default class Users extends Component {

    constructor (props) {
        super(props)
        this.loadUsers = this.loadUsers.bind(this)
        this.loadGroups = this.loadGroups.bind(this)
        this.createGroupToggle = this.createGroupToggle.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.handleRowSelection = this.handleRowSelection.bind(this)
        this.deleteSelectedUser = this.deleteSelectedUser.bind(this)
        this.resetSelected = this.resetSelected.bind(this)
        this.changeUserPermission = this.changeUserPermission.bind(this)
        this.createGroupWithSelectedUsers = this.createGroupWithSelectedUsers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.setErrorMessage = this.setErrorMessage.bind(this)
        this.state = {
            users: [],
            groups: [],
            createGroup: false,
            selected: [],
            open: false,
            groupName: '',
            errorText: ''
        }
    }

    componentDidMount () {
        this.loadUsers()
        this.loadGroups()
    }

    loadGroups () {
        UsersServices.loadGroups().then((groups) => {
            this.setState({groups})
        })
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
        this.setState({groupName: ''})
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1
    }

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        })
    }

    setErrorMessage (message) {
        this.setState({errorText: message})
    }

    createGroupToggle () {
        this.setState({
            createGroup: !this.state.createGroup
        })
        this.resetSelected()
    }

    loadUsers () {
        UsersServices.loadUsers().then((users) => {
            this.setState({users})
        })
    }

    resetSelected () {
        this.setState({selected: []})
    }

    deleteSelectedUser () {
        let user = this.state.users[this.state.selected].user
        UsersServices.deleteUser(user).then(() => {
            CalendarServices.removeCalendar(user)
            this.loadUsers()
            this.resetSelected()
        })
    }

    changeUserPermission () {
        let user = this.state.users[this.state.selected]
        let object = {user: user.user, status: !user.status}
        UsersServices.changeUserPermission(object).then(() => {
            this.loadUsers()
        })
    }

    handleChange = name => event => {
        this.setErrorMessage('')
        this.setState({
            [name]: event.target.value,
        })
    }

    createGroupWithSelectedUsers () {
        let groupExists = this.state.groups.filter(group => group.name === this.state.groupName)
        if (groupExists.length === 0) {
            let selectedUsers
            if (this.state.selected === 'all') {
                selectedUsers = this.state.users.map((index) => {
                    let object = {user: index.user, group: [...index.group, this.state.groupName]}
                    UsersServices.updateUserGroup(object)
                    return index
                })
            } else {
                selectedUsers = this.state.selected.map((index) => {
                    let user = this.state.users[index]
                    let object = {user: user.user, group: [...user.group, this.state.groupName]}
                    UsersServices.updateUserGroup(object)
                    return user
                })
            }
            let group = {name: this.state.groupName, users: selectedUsers}
            UsersServices.createGroup(group).then(() => {
                this.loadUsers()
                this.loadGroups()
            })
            this.handleClose()
        } else {
            this.setErrorMessage('Group name already exists')
        }
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
                    <RaisedButton className='middle-user-button' disabled={this.state.selected.length === 0} secondary
                                  onClick={this.deleteSelectedUser}>
                        Delete
                    </RaisedButton>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton className='left-user-button' primary disabled={this.state.selected.length === 0}
                                  onClick={this.changeUserPermission}>
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
                    <RaisedButton className='left-user-button' primary disabled={this.state.selected.length === 0}
                                  onClick={this.handleOpen}>
                        Create group
                    </RaisedButton>
                </TableRowColumn>
            </TableRow>
        )

        let actions = [
            <RaisedButton className='login-form-button' onClick={this.handleClose} secondary>
                Cancel
            </RaisedButton>,
            <RaisedButton className='login-form-button' onClick={this.createGroupWithSelectedUsers} primary>
                Create group
            </RaisedButton>,
        ]

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
                            <TableHeaderColumn tooltip="The Group of a user">Group</TableHeaderColumn>
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
                                <TableRowColumn>{row.group.toString()}</TableRowColumn>
                                <TableRowColumn>{row.status.toString()}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        {this.state.createGroup ? createGroupButtons : editUserButtons}
                    </TableFooter>
                </Table>
                <Dialog
                    title="Create group panel"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        id='groupName'
                        errorText={this.state.errorText}
                        floatingLabelText='Group Name'
                        value={this.state.groupName}
                        onChange={this.handleChange('groupName')}
                    />
                </Dialog>
            </div>
        )
    }
}