import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <h2>Home</h2>
        </Route>
        <Route path="/about">
          <h2>About</h2>
        </Route>
        <Route path="/projects">
          <h2>Projects</h2>
        </Route>
        <Route path="/blog">
          <h2>Blog</h2>
        </Route>
      </Switch>
    </div>
  </Router>
)

export default App
