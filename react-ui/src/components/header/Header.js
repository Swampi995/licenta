/**
 * Created by swpmr on 3/11/2018.
 */
import React from 'react';
import PropTypes from 'prop-types'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Login from './Login';
import './style/header.css';
import { withRouter } from 'react-router-dom'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            loggedUser: '',
        };

        this.setLoggedUser = this.setLoggedUser.bind(this);
        this.navigateToRoute = this.navigateToRoute.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handleChange = (event, index, value) => this.setState({value});

    setLoggedUser(username) {
      this.setState({loggedUser: username});
    }

    navigateToRoute(path) {
      this.props.history.push(path);
    }

    logOut() {
      this.props.changeLoginState(false);
      this.setLoggedUser('');
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                          <MenuItem value={1} primaryText="Home" onClick={()=>{this.navigateToRoute('/')}}/>
                          <MenuItem value={2} primaryText="About" onClick={()=>{this.navigateToRoute('/about')}}/>
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text={this.state.loggedUser}/>
                    <FontIcon className="muidocs-icon-custom-sort"/>
                    <ToolbarSeparator/>
                    <RaisedButton label="Add Event" primary={true} onClick={!this.props.logged ? ()=>{alert("You must log in first")} : null}/>
                    <IconMenu
                        iconButtonElement={this.props.logged ?
                            <IconButton touch={true}>
                                <NavigationExpandMoreIcon/>
                            </IconButton> : <Login setLoggedUser={this.setLoggedUser} doLogin={() => {this.props.changeLoginState(true)}}/>
                        }
                    >
                      <MenuItem primaryText="Logout" onClick={this.logOut}/>
                      <MenuItem primaryText="Account"/>
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

Header.propTypes = {
  logged: PropTypes.bool,
  changeLoginState: PropTypes.func
}

export default withRouter(Header);