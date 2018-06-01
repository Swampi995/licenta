/**
 * Created by swpmr on 6/1/2018.
 */
import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import Users from './Users'
import Groups from './Groups'

export default class Administration extends React.Component {
    constructor (props) {
        super(props)
        this.loadGroupsInParent = this.loadGroupsInParent.bind(this)
        this.state = {
            value: 'a',
            groups: []
        }
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        })
    }

    loadGroupsInParent (groups) {
        this.setState({groups})
    }

    render () {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Users" value="a">
                    <Users loadGroupsInParent={this.loadGroupsInParent}/>
                </Tab>
                <Tab label="Groups" value="b">
                    <Groups groups={this.state.groups}/>
                </Tab>
            </Tabs>
        )
    }
}