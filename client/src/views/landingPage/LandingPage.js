import { CButton } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <nav className="navbar navbar-light bg-black py-0">
        <div className="container-fluid px-0">
          <a className="navbar-brand p-0">
            <img src={require('../../assets/Cell Unloking Logo.jpg')} height={'92px'} />
          </a>

          <form className="d-flex">
            <Link className="nav-link text-white me-4" to="/contact">
              Contact Us
            </Link>
            <Link className="nav-link text-white me-4" to="/login">
              Login
            </Link>
          </form>
        </div>
      </nav>
      <div className="text-center">
        <img alt='bg-logo' className='w-100' src={require('../../assets/cell1.jpeg')} />
      </div>
    </>
  )
}

export default LandingPage
