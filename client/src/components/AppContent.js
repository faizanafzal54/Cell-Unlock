import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import { routes, adminRoutes } from '../routes'
import { useSelector } from 'react-redux'
import { selectUserRole } from 'src/store/selector/user'
// import { routes, adminRoutes } from '../routes'

const AppContent = () => {
  const userRole = useSelector(selectUserRole)

  const renderAdminRoutes = () => {
    return (
      <Routes>
        {adminRoutes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          )
        })}

        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    )
  }

  const renderUserRoutes = () => {
    return (
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          )
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    )
  }

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        {userRole === 'ADMIN' ? renderAdminRoutes() : renderUserRoutes()}
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
