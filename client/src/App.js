import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './scss/style.scss'
import { logoutAction } from './store/actions/user'
import { store } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import LandingPage from './views/landingPage/LandingPage'
import ContactUs from './views/contact/ContactUs'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export const checkAuth = () => {
  const dispatch = useDispatch()
  const state = store.getState()
  if (!state.user.token) {
    return false
  }
  const decodedToken = jwt_decode(state.user.token)

  if (decodedToken?.exp * 1000 < new Date().getTime()) {
    dispatch(logoutAction())
    return false
  }

  if (state.user?.isAuthenticated) return true
  else return false
}

function RequireAuth() {
  let location = useLocation()

  if (!checkAuth()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <Outlet />
}

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/contact" name="Contact Us Page" element={<ContactUs />} />
            <Route exact path="/" name="Landing Page" element={<LandingPage />} />
            <Route element={<RequireAuth />}>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer />
      </HashRouter>
    )
  }
}

export default App
