import React from 'react'
import { Outlet } from 'react-router-dom'

function ContextLayout({ provider: Component }) {
  return (
    <>
      <Component>
        <Outlet />
      </Component>
    </>
  )
}

export default ContextLayout