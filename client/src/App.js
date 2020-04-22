import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/index.scss'

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import LogoutPage from './pages/LogoutPage'

const App = () => {
  const [token, setToken] = useState()

  useEffect(() => {
    const authToken = sessionStorage.getItem('token')
    if (authToken) {
      setToken(authToken)
    }
  }, [token])

  return (
    <Router>
      <div className="App">
        <Header token={token} />
        <Switch>
          <Route exact path="/">
            <HomePage />
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
          <Route path="/admin">
            <AdminPage token={token} saveToken={setToken} />
          </Route>
          <Route path="/logout">
            <LogoutPage removeToken={setToken} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
