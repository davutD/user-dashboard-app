import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './styles/table.css'
import { useLocation } from 'react-router-dom'
import { Button } from 'primereact/button'

export default function Navbar({ jwtToken, getJwtFromCookie, setJwtToken }) {
  const [signingOut, setSigningout] = useState(false)
  const logout = async () => {
    const response = await fetch('http://localhost:3333/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (response.ok) {
      setTimeout(() => {
        setJwtToken(getJwtFromCookie())
      }, 2999)

      setLoading(true)
      setSigningout(true)
      setTimeout(() => {
        setSigningout(false)
        setLoading(false)
      }, 3000)
    }
  }

  const location = useLocation()
  const [loading, setLoading] = useState(false)

  // const items = [
  //   {
  //     label: 'Dashboard',
  //     icon: 'pi pi-chart-bar',
  //     command: () => {},
  //     template: (item) => {
  //       return (
  //         <NavLink
  //           to="/dashboard"
  //           className={`p-menuitem-link ${
  //             'hover' ? 'hover:text-primary hover:surface-0' : ''
  //           }`}
  //         >
  //           <span className="pi pi-fw pi-chart-bar "></span>
  //           <span>{item.label}</span>
  //         </NavLink>
  //       )
  //     },
  //   },
  //   {
  //     label: 'User',
  //     icon: 'pi pi-user',
  //     command: () => {},
  //     template: (item) => {
  //       return (
  //         <NavLink
  //           to="/user"
  //           className={`p-menuitem-link ${
  //             'hover' ? 'hover:text-primary hover:surface-0' : ''
  //           }`}
  //         >
  //           <span className="pi pi-fw pi-user"></span>
  //           <span>{item.label}</span>
  //         </NavLink>
  //       )
  //     },
  //   },
  //   {
  //     label: 'Sign Out',
  //     icon: 'pi pi-sign-out',
  //     command: () => {
  //       logout()
  //     },
  //     className: 'sign-out-item',
  //   },
  // ]

  return (
    <div className="grid mb-6 w-full m-auto border-bottom-1 surface-border text-800 hover:border-blue-300 hover:shadow-2">
      <div className="col-6 pl-8">
        {location.pathname === '/dashboard' ? (
          <h1 className="ml-5 select-none">Dashboard</h1>
        ) : location.pathname === '/user' ? (
          <h1 className="ml-5 select-none">User</h1>
        ) : (
          <h1 className="ml-5">
            <NavLink
              to="/"
              className={`no-underline text-800 select-none ${
                'hover' ? 'hover:text-primary hover:surface-0' : ''
              }`}
            >
              Main Page
            </NavLink>
          </h1>
        )}
      </div>
      <div className="col-6 flex flex-row-reverse align-items-bottom pr-8">
        {jwtToken !== null ? (
          <div className="grid w-6 h-3rem my-auto">
            <div className="w-auto border-1 m-auto bg-white border-transparent">
              {location.pathname === '/dashboard' ? (
                <NavLink
                  to="dashboard"
                  className={`no-underline text-primary ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-chart-bar pr-1"></span>
                  <span className="select-none">Dashboard</span>
                </NavLink>
              ) : (
                <NavLink
                  to="dashboard"
                  className={`no-underline text-800 ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-chart-bar pr-1"></span>
                  <span className="select-none">Dashboard</span>
                </NavLink>
              )}
            </div>
            <div className="w-auto border-1 m-auto bg-white border-transparent ml-0">
              {location.pathname === '/user' ? (
                <NavLink
                  to="user"
                  className={`no-underline text-primary nav-link ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-user pr-1"></span>
                  <span className="select-none">User</span>
                </NavLink>
              ) : (
                <NavLink
                  to="user"
                  className={`no-underline text-800 nav-link ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-user pr-1"></span>
                  <span className="select-none">User</span>
                </NavLink>
              )}
            </div>
            <Button
              loading={loading}
              className="w-5 border-1 m-auto bg-white border-transparent -ml-3 button-hover"
            >
              {signingOut === true ? (
                <NavLink
                  onClick={logout}
                  className={`button-text no-underline text-primary ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  {loading === true ? (
                    <span className="select-none">
                      Signing out...{' '}
                      <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: '1rem' }}
                      ></i>
                    </span>
                  ) : (
                    <>
                      <span className="pi pi-sign-out pr-1"></span>
                      <span className="select-none">Sign Out</span>
                    </>
                  )}
                </NavLink>
              ) : (
                <NavLink
                  onClick={logout}
                  className={`button-text no-underline text-800 ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  {loading === true ? (
                    <span className="select-none">
                      Signing out...{' '}
                      <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: '1rem' }}
                      ></i>
                    </span>
                  ) : (
                    <>
                      <span className="pi pi-sign-out pr-1"></span>
                      <span className="select-none">Sign Out</span>
                    </>
                  )}
                </NavLink>
              )}
            </Button>
          </div>
        ) : (
          <div className="grid w-3 h-3rem my-auto mr-8">
            <div className="w-auto border-1 m-auto bg-white border-transparent">
              {location.pathname === '/signin' ? (
                <NavLink
                  to="signin"
                  className={`no-underline text-primary ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-sign-in pr-1"></span>
                  <span className="select-none">Sign In</span>
                </NavLink>
              ) : (
                <NavLink
                  to="signin"
                  className={`no-underline text-800 ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-sign-in pr-1"></span>
                  <span className="select-none">Sign In</span>
                </NavLink>
              )}
            </div>
            <div className="w-auto border-1 m-auto bg-white border-transparent">
              {location.pathname === '/signup' ? (
                <NavLink
                  to="signup"
                  className={`no-underline text-primary ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-user-plus pr-1"></span>
                  <span className="select-none">Sign Up</span>
                </NavLink>
              ) : (
                <NavLink
                  to="signup"
                  className={`no-underline text-800 ${
                    'hover' ? 'hover:text-primary hover:surface-0' : ''
                  }`}
                >
                  <span className="pi pi-user-plus pr-1"></span>
                  <span className="select-none">Sign Up</span>
                </NavLink>
              )}
            </div>
          </div>
        )}
        {/* <NavLink to="/signin" onClick={logout}>
          Sign Out
        </NavLink>
        <span>|</span>
        {!jwtToken && (
          <>
            <NavLink to="/signup">SignUp</NavLink>
            <span>|</span>
            <NavLink to="/signin">SignIn</NavLink>
            <span>|</span>
          </>
        )}
        <NavLink to="/user">User</NavLink>
        <span>|</span>
        <NavLink to="/dashboard">Dashboard</NavLink> */}
      </div>
    </div>
  )
}
