/**
 * Created by swpmr on 3/11/2018.
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../home/Home'
import About from '../about/About'
import Calendar from '../calendar/Calendar'
import Room from '../home/Room'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/calendar' component={Calendar}/>
      <Route exact path='/room' component={Room}/>
      <Route path='/about' component={About}/>
    </Switch>
  </main>
);

export default Main;