import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'
import {BrowserRouter} from 'react-router-dom'
import {MuiThemeProvider} from "material-ui";

ReactDOM.render((
    <BrowserRouter>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </BrowserRouter>
), document.getElementById('root'));
