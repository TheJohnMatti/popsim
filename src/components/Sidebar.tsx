import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useEnitityStore } from '../stores/useEntityStore';
import useOptionsStore from '../stores/useOptionsStore';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const {addEntity} = useEnitityStore();

  const {activeColor} = useOptionsStore();

  return (
    <div className='absolute top-0 left-0 h-full shadow-2xl'>
      <div className={`bg-amber-100 h-full justify-center transition-all duration-300 ${open ? 'w-96' : 'w-12'} flex flex-col`}>
        <div
          className="self-end m-2 p-1 rounded cursor-pointer transition bg-white absolute top-[50%]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        >
          {open ? <BiChevronLeft size={24} /> : <BiChevronRight size={24} />}
        </div>
        {open && (
          <div className="p-4 w-[80%]">
            {/* Sidebar content here */}
            <button className="w-full bg-blue-500 text-white p-2 rounded mb-2"
              onClick={() => addEntity({
                  id: crypto.randomUUID(),
                  position: { x: 0, y: 0,},
                  action: 'idle',
                  color: activeColor, //purple 0x800080, // Default color for entities
                  radius: 1, // Optional radius for circle entities
              })}
            >Add Cell</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar