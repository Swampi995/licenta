import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import createStore from './store'

const store = createStore()

const muiTheme = getMuiTheme({
    "palette": {
        "primary1Color": "#616161",
        "accent1Color": "#7e57c2",
        "canvasColor": "#eeeeee",
        "primary2Color": "#b39ddb",
        "primary3Color": "#e0e0e0",
        "accent2Color": "#b39ddb",
        "accent3Color": "#b39ddb",
        "alternateTextColor": "#bdbdbd",
        "textColor": "#7e57c2",
        "pickerHeaderColor": "#7e57c2",
        "shadowColor": "#4527a0"
    },
    "toolbar": {
        "backgroundColor": "#9e9e9e"
    }
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))
