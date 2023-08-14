import { useState } from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import CenterSidebar from './CenterSidebar'

function HomePage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap max-lg:flex-col pt-14 px-3 relative">
      <div className="max-lg:block hidden">
        <button onClick={() => setOpen(true)}>open sidebar</button>
      </div>
      <LeftSidebar open={open} setOpen={setOpen} />
      <CenterSidebar />
      <RightSidebar />
    </div>
  )
}

export default HomePage