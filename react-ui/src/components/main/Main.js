/**
 * Created by swpmr on 3/11/2018.
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../home/Home'
import About from '../about/About'
import Room from '../room/Room'
import Users from '../administration/Users'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/room' component={Room}/>
            <Route path='/about' component={About}/>
        </Switch>
    </main>
)

export default Main