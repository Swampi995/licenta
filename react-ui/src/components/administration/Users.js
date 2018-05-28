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
import { Checkbox, RaisedButton, TableFooter } from 'material-ui'
import UsersServices from '../../api/UsersServices'

export default class Users extends Component {

    constructor (props) {
        super(props)
        this.loadUsers = this.loadUsers.bind(this)
        this.createGroupToggle = this.createGroupToggle.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.handleRowSelection = this.handleRowSelection.bind(this)
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
    }

    componentDidMount () {
        this.loadUsers()
    }

    loadUsers () {
        UsersServices.loadUsers().then((users) => {
            this.setState({users})
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
                    <RaisedButton className='middle-user-button' secondary>
                        Delete
                    </RaisedButton>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton className='left-user-button' primary onClick={() => {console.log(this.state.users[this.state.selected])}}>
                        Save user
                    </RaisedButton>
                </TableRowColumn>
            </TableRow>
        )

        let createGroupButtons = (
            <TableRow>
                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                    <RaisedButton className='left-user-button' onClick={this.createGroupToggle}>
                        Edit user
                    </RaisedButton>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton className='left-user-button' primary onClick={() => {console.log(this.state.selected)}}>
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
                                    <Checkbox
                                        checked={row.status}
                                    />
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