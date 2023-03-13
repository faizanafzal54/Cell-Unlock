import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCarousel, CCarouselItem, CCol, CRow } from '@coreui/react'
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
      <div style={{ backgroundColor: '#EBEDEF' }} className="text-center landing-page-div ">
        <CRow className='justify-content-center g-0'>
          <div class="col-8">
            <div class="callout callout-info bg-white text-start">
              <div><h4>IMPORTANT NOTICE !</h4> </div>
              Dear client, our All service working (Monday to Friday - Saturday + Sunday holiday) Please before order must count Service max time and working days "Monday to Friday"

              Thank you for using cellunlocking.us seerver
            </div>
          </div>
        </CRow>
        <CRow className='g-0'>
          <div class="col-6 ps-4 pe-2">
            <div class="callout callout-info bg-white text-start mt-0">
              <div><h4> 24/7 Reliable Support:</h4> </div>

              our staff available 24x7. you can contact via E-mail, whatsapp Text Message, we're here to help.
              <br />
              <br />
              <div><h4> Beatable prices:</h4> </div>
              we are offering best price that can BEAT any competitors' price.
              <br />
              <br />
              <div><h4> Absolutely Safe:</h4> </div>
              your all information Completely safe include your money as well.
              <br />
              <br />
              <div><h4> Unlock All Major Brands:</h4> </div>
              LG, Huawei, Samsung, Nokia, HTC, IPhone, Sony.
              All kind of BOX/DONGLE Tool credit available
            </div>
            <div class="callout callout-info bg-white text-start">
              <div><h4>Our Mission</h4> </div>
              Our mission is to meet customer expectations by providing quick response, lowest pricing, and consistent service. We try to make your business and your profit margins grow as much as possible.
            </div>
            <div class="callout callout-info bg-white text-start">
              <div><h4>Contact Us</h4> </div>
              <div className='d-flex pt-2'>

                <a href="https://www.facebook.com/cellunlocking.us" target="_blank" className='icon-parent-fb'>
                  <i class="fa-2x fa fa-facebook"></i>
                </a>
                <a href='tel:+92-326-5171409' className='icon-parent-tg'>
                  <i class="fa-2x fa fa-telegram"></i>
                </a>
                <a href='tel:+92-326-5171409' className='icon-parent-wa'>
                  <i class="fa-2x fa fa-whatsapp"></i>
                </a>

              </div>

            </div>
          </div>
          <CCol xs={6} className='ps-2 pe-4'>
            <CCard>
              <CCardBody className='p-0 py-2'>
                <CCarousel controls>
                  <CCarouselItem>
                    <img className="d-block container-fluid" src={require('../../assets/cell1.jpeg')} alt="slide 1" />
                  </CCarouselItem>
                  <CCarouselItem>
                    <img className="d-block container-fluid" src={require('../../assets/cell2.jpeg')} alt="slide 2" />
                  </CCarouselItem>
                </CCarousel>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default LandingPage
