/**
 * Created by swpmr on 3/11/2018.
 */
import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Home"/>
                        <MenuItem value={2} primaryText="Sala 1"/>
                        <MenuItem value={3} primaryText="Sala 2"/>
                        <MenuItem value={4} primaryText="Sala 3"/>
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="Options"/>
                    <FontIcon className="muidocs-icon-custom-sort"/>
                    <ToolbarSeparator/>
                    <RaisedButton label="Create Broadcast" primary={true} onClick={()=>{this.props.changeLoginState(true)}}/>
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <NavigationExpandMoreIcon/>
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Login"/>
                        <MenuItem primaryText="More Info"/>
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}