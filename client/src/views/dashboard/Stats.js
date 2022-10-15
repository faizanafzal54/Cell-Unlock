import React, { useEffect } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'

const Stats = () => {
  const dispatch = useDispatch()

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-3"
          color="success"
          value={<>{0}</>}
          title="Available Balance"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-3"
          color="primary"
          value={<>{0}</>}
          title="Credits in Progress"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-3"
          color="secondary"
          value={<>{0}</>}
          title="Credit Used"
        />
      </CCol>
    </CRow>
  )
}

export default Stats
