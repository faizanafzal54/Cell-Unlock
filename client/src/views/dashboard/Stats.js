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
import { user } from 'src/store/selector/user'
import { getStatsAction } from 'src/store/actions/user'

const Stats = () => {
  const dispatch = useDispatch()
  const userDetail = useSelector(user)
  const stats = useSelector((state) => state.user.stats)

  useEffect(() => {
    dispatch(getStatsAction(userDetail._id))
  }, [getStatsAction])

  return (
    <CRow>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 pb-3"
          color="success"
          value={<>${stats?.availableBalance}</>}
          title="Available Balance"
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 pb-3"
          color="primary"
          value={<>${stats?.creditsInProgress}</>}
          title="Credits in Progress"
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4 pb-3"
          color="secondary"
          value={<>${stats?.creditUsed}</>}
          title="Credit Used"
        />
      </CCol>
    </CRow>
  )
}

export default Stats
