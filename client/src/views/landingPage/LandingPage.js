import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
      <div style={{ backgroundColor: '#EBEDEF' }} className="text-center landing-page-div ">
        <div class="d-flex align-items-center py-3" style={{ color: 'red', fontSize: '20px' }}>
          <marquee behavior="scroll" direction="left"> Dear client, our All service working (Monday to Friday - Saturday + Sunday holiday) Please before order must count Service max time and working days "Monday to Friday"
            Thank you for using cellunlocking.us server.</marquee>
        </div>
        <CRow className='g-0'>
          <CCol xs={12} className='px-3'>
            <CCard>
              <CCardBody className='p-0 py-2'>
                <Carousel autoPlay={true} interval={4000} infiniteLoop={true}>
                  <div>
                    <img className="d-block container-fluid" src={require('../../assets/bg1.png.jpg')} alt="slide 1" />
                  </div>
                  <div>
                    <img className="d-block container-fluid" src={require('../../assets/bg2.png.jpg')} alt="slide 2" />
                  </div>
                  <div>
                    <img className="d-block container-fluid" src={require('../../assets/bg3.png.jpg')} alt="slide 2" />
                  </div>
                </Carousel>
              </CCardBody>
            </CCard>
          </CCol>
          <div class="container mb-5 mt-5">
            <h4>We Unlock All <b className=''>Major Brands</b></h4>
            <div class="row mt-4" style={{ overflowX: 'auto' }}>
              <div class="brand-logo-div"> <img src={require('../../assets/Vivo-Logo.jpg')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/sony-logo.png')} width={'100px'} /> </div>
              <div class="brand-logo-div mt-2"> <img src={require('../../assets/samsung-logo.png')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/realme-logo.jpg')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/Oppo-logo.png')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/nokia-logo.webp')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/lg-logo.png')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/iphone-logo.png')} width={'100px'} /> </div>
              <div class="brand-logo-div"> <img src={require('../../assets/hwawei-logo.png')} width={'100px'} /> </div>
            </div>
          </div>
          <div class="col-12 px-3">
            <div className='row g-0'>
              <div className='col-md-6 px-1'>
                <div class="callout callout-info bg-white text-start mt-0">
                  <div><h4> Unlock All Major Brands:</h4> </div>
                  LG, Huawei, Samsung, Nokia, HTC, IPhone, Sony.
                  All kind of BOX/DONGLE Tool credit available
                </div>
              </div>
              <div className='col-md-6 px-1'>
                <div class="callout callout-info bg-white text-start mt-0">
                  <div><h4> 24/7 Reliable Support:</h4> </div>
                  our staff available 24x7. you can contact via E-mail, whatsapp Text Message, we're here to help.
                </div>
              </div>
              <div className='col-md-6 px-1'>
                <div class="callout callout-info bg-white text-start mt-0">
                  <div><h4> Beatable prices:</h4> </div>
                  we are offering best price that can BEAT any competitors' price.
                </div>
              </div>
              <div className='col-md-6 px-1'>
                <div class="callout callout-info bg-white text-start mt-0">
                  <div><h4> Absolutely Safe:</h4> </div>
                  your all information Completely safe include your money as well.
                </div>
              </div>
            </div>


          </div>
        </CRow>

        <div class="bg-black text-white p-5">
          <footer class="row g-0">
            <div class="col-md-3 text-start">
              <h4>Cellunlocking.us</h4>
              <p class="text-white">© {new Date().getFullYear()}</p>
            </div>

            <div class="col-md-3 text-start">
              <h5>Our Mission</h5>
              <p style={{ maxWidth: '300px' }}>
                Our mission is to meet customer expectations by providing quick response, lowest pricing, and consistent service. We try to make your business and your profit margins grow as much as possible.
              </p>
            </div>

            <div class="col-md-3 text-start">
              <h5>Main Pages</h5>
              <ul class=" flex-column">
                <li class=" mb-2"><a href="https://cellunlocking.us/" class="nav-link p-0 text-white">Home</a></li>
                <li class=" mb-2"><a href="https://cellunlocking.us/#/contact" class="nav-link p-0 text-white">Contact us</a></li>
                <li class=" mb-2"><a href="https://cellunlocking.us/#/login" class="nav-link p-0 text-white">App Login</a></li>
              </ul>
            </div>

            <div class="col-md-3 text-start">
              <h5>Contact us</h5>
              <ul class="nav flex-column">
                <li class="nav-item mb-2">

                </li>
                <li class="nav-item mb-2">
                  <a href='tel:+92-326-5171409' className='nav-link text-white p-0'>
                    Whatsapp:  +92-326-5171409
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a className='nav-link text-white p-0'>
                    Email:  Cellunlocking061@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>

        <div className='d-flex absolute-icons-fb'>
          <a href="https://www.facebook.com/cellunlocking.us" target="_blank" className='icon-parent-fb'>
            <i class="fa-2x fa fa-facebook"></i>
          </a>
        </div>
        <div className='d-flex absolute-icons-tg'>
          <a href='tel:+92-326-5171409' className='icon-parent-tg'>
            <i class="fa-2x fa fa-telegram"></i>
          </a>
        </div>
        <div className='d-flex absolute-icons-wa'>
          <a href='tel:+92-326-5171409' className='icon-parent-wa'>
            <i class="fa-2x fa fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </>
  )
}

export default LandingPage
