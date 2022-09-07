import { cilCode, cilMediaPlay } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormCheck, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import React, { useState } from 'react'
import { DocsExample } from 'src/components'
import { bothNotifications } from 'src/store/services/notifications'
import { toastify } from 'src/store/services/toastify'

function Notifications() {
    const [tab, setTab] = useState(1)
    const [type, setType] = useState(1)
    const [moduleType, setModuleType] = useState(1)
    const [msg, setMsg] = useState('')
    const [sendTo, setSendTo] = useState({
        active: true,
        pending: true,
        inactive: true
    })

    const handleSubmit = async () => {
        try {
            const res = await bothNotifications({
                type,
                msg,
                sendTo,
                moduleType
            })
            if (res.status === 200) {
                toastify("success", "Request Initiated")
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <CCard>
            <CCardHeader>
                <div className="row ml-2 mr-2 justify-content-between">
                    <em>Notifications</em>
                </div>
            </CCardHeader>
            <CCardBody>
                <CCol xs={12}>
                    {/* <CNav variant="tabs">
                        <CNavItem>
                            <CNavLink onClick={() => setTab(1)} active={tab === 1}>
                                Both
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink onClick={() => setTab(2)} active={tab === 2}>
                                Artisan
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink onClick={() => setTab(3)} active={tab === 3}>
                                Customer
                            </CNavLink>
                        </CNavItem>
                    </CNav> */}
                    <CTabContent className="rounded-bottom">
                        <CTabPane className="p-3 preview" visible={tab === 1}>
                            <div className='pt-3'>
                                <label><b>Select User Type</b></label>
                                <CFormCheck
                                    type="radio"
                                    name="moduleType"
                                    id="a"
                                    label="Both"
                                    checked={moduleType === 1}
                                    onChange={() => setModuleType(1)}
                                />
                                <CFormCheck
                                    type="radio"
                                    name="moduleType"
                                    id="b"
                                    label="Artisan"
                                    checked={moduleType === 2}
                                    onChange={() => setModuleType(2)}
                                />
                                <CFormCheck
                                    type="radio"
                                    name="moduleType"
                                    id="3"
                                    label="Customer"
                                    checked={moduleType === 3}
                                    onChange={() => setModuleType(3)}
                                />
                            </div>
                            <div>
                                <label><b>Send Notification to:</b></label>
                            </div>
                            <CFormCheck id="Active" onChange={(e) => {
                                setSendTo({
                                    ...sendTo,
                                    active: e.target.checked
                                })
                            }} checked={sendTo.active} label="Active Users" />
                            <CFormCheck id="pending" onChange={(e) => {
                                setSendTo({
                                    ...sendTo,
                                    pending: e.target.checked
                                })
                            }} checked={sendTo.pending} label="Pending Users" />
                            <CFormCheck
                                id="inactive" onChange={(e) => {
                                    setSendTo({
                                        ...sendTo,
                                        inactive: e.target.checked
                                    })
                                }} checked={sendTo.inactive} label="Inactive Users" />

                            <div className='pt-3'>
                                <label><b>Notification Type:</b></label>
                                <CFormCheck
                                    type="radio"
                                    name="type"
                                    id="flexRadioDefault1"
                                    label="Email"
                                    checked={type === 1}
                                    onChange={() => setType(1)}
                                />
                                <CFormCheck
                                    type="radio"
                                    name="type"
                                    id="flexRadioDefault2"
                                    label="Push"
                                    checked={type === 2}
                                    onChange={() => setType(2)}
                                />
                            </div>
                            <div className='pt-3'>
                                <label><b>Enter message to be sent:</b></label>
                                <textarea className='form-control' onChange={e => setMsg(e.target.value)} value={msg}></textarea>
                            </div>
                            <div className='pt-3'>
                                <CButton
                                    disabled={msg.length < 4 || (sendTo.active === false && sendTo.inactive === false && sendTo.pending === false)}
                                    color="primary"
                                    variant="outline"
                                    type="button"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Send
                                </CButton>
                            </div>
                        </CTabPane>
                    </CTabContent>
                </CCol>
            </CCardBody>
        </CCard >

    )
}

export default Notifications