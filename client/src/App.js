import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/index.scss'

import Header from './components/Header'

import HomePage from './pages/HomePage'

import AdminPage from './pages/AdminPage'
import AdminBlog from './pages/AdminPage/AdminBlog'
import AdminGallery from './pages/AdminPage/AdminGallery'
import AdminUsers from './pages/AdminPage/AdminUsers'

import LogoutPage from './pages/LogoutPage'

const App = () => {
  const [token, setToken] = useState()

  useEffect(() => {
    const authToken = sessionStorage.getItem('token')
    if (authToken) {
      setToken(authToken)
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Header token={token} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/admin">
            <AdminPage token={token} saveToken={setToken} />
          </Route>
          <Route path="/admin-blog">
            <AdminBlog token={token} />
          </Route>
          <Route path="/admin-gallery">
            <AdminGallery token={token} />
          </Route>
          <Route path="/admin-users">
            <AdminUsers token={token} />
          </Route>
          <Route path="/logout">
            <LogoutPage removeToken={setToken} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
