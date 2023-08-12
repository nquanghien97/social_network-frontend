import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import CenterSidebar from './CenterSidebar'

function HomePage() {
  return (
    <div className="flex flex-wrap pt-14 px-3">
      <LeftSidebar />
      <CenterSidebar />
      <RightSidebar />
    </div>
  )
}

export default HomePage