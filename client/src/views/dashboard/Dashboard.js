import React from 'react'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { getStyle, hexToRgba } from '@coreui/utils'

import Stats from './Stats'

const Dashboard = () => {
  return (
    <>
      <Stats />
      <CCard className="mb-4"></CCard>
    </>
  )
}

export default Dashboard
