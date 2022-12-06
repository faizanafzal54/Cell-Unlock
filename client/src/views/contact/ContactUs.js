import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ContactUs(props) {
  const navigate = useNavigate()
  const handleRedirectToHome = () => {
    navigate('/')
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row pt-4">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <div className="text-center">
                    <h4>Cell Unlocking Portal</h4>
                  </div>
                  <div className="pt-4">
                    <h5>Contact Us</h5>
                    <p> Any Questions? Contact us!</p>
                  </div>
                  <div>
                    <div className="d-flex">
                      <span>
                        <b>Whatsapp:</b>
                      </span>
                      <span className="ms-2">+92-326-5171409</span>
                    </div>
                    <div className="d-flex">
                      <span>
                        <b>Email:</b>
                      </span>
                      <span className="ms-2">Cellunlocking061@gmail.com</span>
                    </div>

                    <div className="d-flex">
                      <span>
                        <b>Facebook:</b>
                      </span>
                      <span className="ms-2">
                        <a href="https://www.facebook.com/cellunlocking.us" target="_blank">
                          Click here
                        </a>
                      </span>
                    </div>
                    <div className="d-flex">
                      <span>
                        <b>Site:</b>
                      </span>
                      <span className="ms-2">
                        <a href="https://t.me/cellunulocking" target="_blank">
                          Click here
                        </a>
                      </span>
                    </div>
                  </div>
                  <hr />
                  <CButton onClick={handleRedirectToHome} color="info">
                    Back to Home Page
                  </CButton>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ContactUs
