import { CButton } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <nav class="navbar navbar-light bg-light py-0">
        <div class="container-fluid px-0">
          <a class="navbar-brand p-0">
            <img src={require('../../assets/Cell Unloking Logo.jpg')} height={'92px'} />
          </a>

          <form class="d-flex">
            <Link className="nav-link me-4" to="/contact">
              Contact Us
            </Link>
            <Link className="nav-link me-4" to="/login">
              Login
            </Link>
          </form>
        </div>
      </nav>
      <div className="container text-center mt-4">
        <img style={{ maxWidth: '1080px' }} src={require('../../assets/cell1.jpeg')} />
      </div>
    </>
  )
}

export default LandingPage
