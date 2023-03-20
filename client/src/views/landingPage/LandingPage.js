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
        <div class="d-flex align-items-center py-3" style={{ color: 'red', fontSize: '20px' }}>
          <marquee behavior="scroll" direction="left"> Dear client, our All service working (Monday to Friday - Saturday + Sunday holiday) Please before order must count Service max time and working days "Monday to Friday"
            Thank you for using cellunlocking.us server.</marquee>
        </div>
        <CRow className='g-0'>
          <CCol xs={12} className='px-3'>
            <CCard>
              <CCardBody className='p-0 py-2'>
                <CCarousel controls>
                  <CCarouselItem>
                    <img className="d-block container-fluid" src={require('../../assets/bg1.png.jpg')} alt="slide 1" />
                  </CCarouselItem>
                  <CCarouselItem>
                    <img className="d-block container-fluid" src={require('../../assets/bg2.png.jpg')} alt="slide 2" />
                  </CCarouselItem>
                  <CCarouselItem>
                    <img className="d-block container-fluid" src={require('../../assets/bg3.png.jpg')} alt="slide 2" />
                  </CCarouselItem>
                </CCarousel>
              </CCardBody>
            </CCard>
          </CCol>
          <div class="col-12 pt-3 px-3">
            <div className='row g-0'>
              <div className='col-12 px-1'>
                <div class="callout callout-info bg-white text-start mt-0">
                  <div><h4>Our Mission</h4> </div>
                  Our mission is to meet customer expectations by providing quick response, lowest pricing, and consistent service. We try to make your business and your profit margins grow as much as possible.
                </div>
              </div>
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
