import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/index.scss'

import Header from './components/Header'

import BlogPage from './pages/BlogPage'
import HomePage from './pages/HomePage'

import AdminPage from './pages/AdminPage'
import AdminBlog from './pages/AdminPage/AdminBlog'
import AdminGallery from './pages/AdminPage/AdminGallery'
import AdminUsers from './pages/AdminPage/AdminUsers'
import AdminProfile from './pages/AdminPage/AdminProfile'

import LogoutPage from './pages/LogoutPage'

const App = () => {
  const [token, setToken] = useState()
  const [userData, setUserData] = useState()

  useEffect(() => {
    const authToken = sessionStorage.getItem('token')
    const data = sessionStorage.getItem('user')
    if (authToken) setToken(authToken)
    if (data) setUserData(JSON.parse(data))
  }, [])

  return (
    <Router>
      <div className="App">
        <Header token={token} userData={userData} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/blog">
            <BlogPage />
          </Route>
          <Route path="/admin">
            <AdminPage
              token={token}
              saveToken={setToken}
              userData={userData}
              saveUserData={setUserData}
            />
          </Route>
          <Route path="/admin-blog">
            <AdminBlog token={token} userData={userData} />
          </Route>
          <Route path="/admin-profile">
            <AdminProfile token={token} userData={userData} />
          </Route>
          <Route path="/admin-gallery">
            <AdminGallery token={token} userData={userData} />
          </Route>
          <Route path="/admin-users">
            <AdminUsers token={token} userData={userData} />
          </Route>
          <Route path="/logout">
            <LogoutPage removeToken={setToken} removeUserData={setUserData} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
