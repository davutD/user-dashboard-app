const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const jwt = getJwtFromCookie()
    setAuthenticated(!!jwt)
  }, [])

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
export default PrivateRoute
