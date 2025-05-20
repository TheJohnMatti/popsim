import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='absolute top-0 left-0 h-full shadow-2xl'>
      <div className={`bg-amber-100 h-full justify-center transition-all duration-300 ${open ? 'w-96' : 'w-12'} flex flex-col`}>
        <div
          className="self-end m-2 p-1 rounded cursor-pointer transition bg-white"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        >
          {open ? <BiChevronLeft size={24} /> : <BiChevronRight size={24} />}
        </div>
        {open && (
          <div className="p-4">
            {/* Sidebar content here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar