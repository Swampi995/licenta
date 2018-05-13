import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))
