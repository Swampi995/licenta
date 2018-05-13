/**
 * Created by swpmr on 4/14/2018.
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import {FlatButton, TextField} from 'material-ui'
import UsersServices from "../../api/UsersServices"
import CalendarServices from '../../api/CalendarServices'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            register: false,
            open: false,
            username: '',
            password: '',
            errorText: '',
            newUsername: '',
            newPassword: '',
            confirmPassword: ''
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleRequestLogin = this.handleRequestLogin.bind(this);
        this.handleRequestRegister = this.handleRequestRegister.bind(this)
    }

    componentWillMount() {
        this.loadUsers()
    }

    loadUsers() {
        UsersServices.loadUsers().then(data => {
            this.setState({users: data})
        })
    }

    addUser(user, calendar) {
        UsersServices.addUser(user).then(() => {
            this.loadUsers();
        });
        CalendarServices.postCalendar(calendar);
    }


    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
            register: false
        })
    };

    requestLogin() {
        let user = this.state.users.filter(user => user.user === this.state.username);
        user[0] && user[0].password === this.state.password ? this.doLogin(user[0]) : this.setErrorMessage('Wrong username or password!')
    }

    requestRegister() {
        let user = this.state.users.filter(user => user.user === this.state.username);
        if (user.length === 0) {
            this.state.password === this.state.confirmPassword ? this.postUser() : this.setErrorMessage('Password must be the same!')
        } else this.setErrorMessage('Username already used!');
    }

    doLogin(user) {
        this.props.setLoggedUser(user.user);
        this.props.doLogin();
        this.setState({open: false})
    }

    postUser() {
        let user = {
            user: this.state.username,
            password: this.state.password
        };
        let calendar = {
            name: this.state.username,
            events: [],
        };

        this.addUser(user, calendar);
        this.setState({register: !this.state.register})
    }

    setErrorMessage(message) {
        this.setState({errorText: message})
    }

    handleRequestLogin = () => {
        this.state.username !== '' && this.state.password !== '' ? this.requestLogin() : this.setErrorMessage('Wrong username or password!')
    };

    handleRequestRegister = () => {
        this.state.username !== '' && this.state.password !== '' ? this.requestRegister() : this.setErrorMessage('Username and password must not be empty!')
    };

    handleChange = name => event => {
        this.setErrorMessage('');
        this.setState({
            [name]: event.target.value,
        })
    };

    render() {
        const actionLogin = [
            <FlatButton className='login-form-button' onClick={() => {
                this.setState({register: !this.state.register})
            }}
                        label='Register' primary/>,
            <RaisedButton className='login-form-button' onClick={this.handleRequestClose} secondary>
                Cancel
            </RaisedButton>,
            <RaisedButton className='login-form-button' onClick={this.handleRequestLogin} primary>
                Login
            </RaisedButton>
        ];
        const actionsRegister = [
            <RaisedButton className='login-form-button' onClick={this.handleRequestClose} secondary>
                Cancel
            </RaisedButton>,
            <RaisedButton className='login-form-button' onClick={this.handleRequestRegister} primary>
                Register
            </RaisedButton>,
        ];
        const textFieldLogin = [
            <div key={'textFieldLogin'}>
                <TextField
                    id='username'
                    floatingLabelText='Username'
                    errorText={this.state.errorText}
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                /><br/>
                <TextField
                    id='password'
                    floatingLabelText='Password'
                    errorText={this.state.errorText}
                    type='password'
                    onChange={this.handleChange('password')}
                />
            </div>
        ];
        const textFieldRegister = [
            <div key={'textFieldRegister'}>
                <TextField
                    id='username'
                    floatingLabelText='New Username'
                    errorText={this.state.errorText}
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                /><br/>
                <TextField
                    id='password'
                    floatingLabelText='New Password'
                    errorText={this.state.errorText}
                    type='password'
                    onChange={this.handleChange('password')}
                />
                <TextField
                    id='confirmPassword'
                    floatingLabelText='Confirm Password'
                    errorText={this.state.errorText}
                    type='password'
                    onChange={this.handleChange('confirmPassword')}
                />
            </div>
        ];
        return (
            <div>
                <RaisedButton onClick={this.handleClickOpen}>Login</RaisedButton>
                <Dialog className='login-dialog' open={this.state.open}
                        title={this.state.register ? 'Register' : 'Login'}
                        actions={!this.state.register ? actionLogin : actionsRegister}
                        onRequestClose={this.handleRequestClose}>
                    {!this.state.register ? textFieldLogin : textFieldRegister}
                    <br/>
                    <br/>
                </Dialog>
            </div>
        )
    }
}

Login.propTypes = {
    setLoggedUser: PropTypes.func,
    doLogin: PropTypes.func
};