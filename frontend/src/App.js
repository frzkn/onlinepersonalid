import React from 'react'
import logo from './images/logo.svg'
import terminal from './images/terminal.svg'
import profile from './images/profile.svg'
import photo from './images/photos.svg'
import Browser from './components/Browser.js'
import Profile from './components/Profile'
import Photo from './components/Photo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import './App.css'

function App() {
  return [
    <div className="App">
      <Router>
        <aside>
          <header>
            <img src={logo} alt="logo"></img>
            <h3>Online Personal Identity.</h3>
            <div class="nav-links">
              <NavLink to="/" exact activeClassName="active">
                <div class="circle">
                  <img src={terminal} alt="terminal"></img>
                  <p></p>
                </div>
              </NavLink>
              <NavLink to="/profile">
                <div class="circle">
                  <img src={profile} alt="profile"></img>
                  <p></p>
                </div>
              </NavLink>
              <NavLink to="/photo">
                <div class="circle">
                  <img src={photo} alt="photos"></img>
                  <p></p>
                </div>
              </NavLink>
            </div>
          </header>
        </aside>
        <div class="container">
          <Switch>
            <Route path="/" exact>
              <Browser />
            </Route>
            <Route path="/profile">{<Profile />}</Route>
            <Route path="/photo">{<Photo />}</Route>
          </Switch>
        </div>
      </Router>
    </div>
  ]
}

export default App
