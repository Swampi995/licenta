/**
 * Created by swpmr on 5/28/2018.
 */
import React, { Component } from 'react'
import { List, ListItem } from 'material-ui'
import { SocialGroup, SocialPerson } from 'material-ui/svg-icons/index'

class Groups extends Component {

    constructor (props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleNestedListToggle = this.handleNestedListToggle.bind(this)
        this.state = {
            groups: this.props.groups,
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({groups: nextProps.groups})
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        })
    }

    render () {
        return (
            <List >
                {this.state.groups.map((group, index) => (
                    <ListItem key={index}
                              primaryText={group.name}
                              leftIcon={<SocialGroup />}
                              nestedItems={group.users.map((user, index) =>
                                  <ListItem key={index} primaryText={user.user} leftIcon={<SocialPerson />}/>
                              )}
                    />
                ))}
            </List>
        )
    }
}

export default Groups