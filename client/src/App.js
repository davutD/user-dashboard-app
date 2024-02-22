import React, { useState, useEffect } from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import UserListPage from './components/datatable/UserListPage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import MainPage from './components/auth/MainPage'
// import PrivateRoute from './RouteGuard'

function App() {
  const [jwtToken, setJwtToken] = useState(null)

  const getJwtFromCookie = () => {
    const cookies = document.cookie.split(';')
    const jwtCookie = cookies.find((cookie) => cookie.trim().startsWith('jwt='))
    if (jwtCookie) {
      const jwt = jwtCookie.split('=')[1]
      return jwt
    }
    return null
  }

  useEffect(() => {
    const jwt = getJwtFromCookie()
    console.log(jwt)
    if (jwt && !jwtToken) {
      setJwtToken(jwt)
    }
    console.log(jwtToken)
  }, [jwtToken])

  return (
    <Router>
      <div>
        {/* {jwtToken && ( */}
        <Navbar
          jwtToken={jwtToken}
          setJwtToken={setJwtToken}
          getJwtFromCookie={getJwtFromCookie}
        />
        {/* )} */}
        <Routes>
          {jwtToken ? (
            <>
              <Route path="/user" element={<UserListPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route
                path="/signin"
                element={
                  <Signin
                    jwtToken={jwtToken}
                    setJwtToken={setJwtToken}
                    getJwtFromCookie={getJwtFromCookie}
                  />
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
