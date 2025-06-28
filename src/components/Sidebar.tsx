import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight, BiPlus } from 'react-icons/bi'
import { useEnitityStore } from '../stores/useEntityStore';
import useOptionsStore from '../stores/useOptionsStore';
import { Position, Velocity } from '../utils';
import { Entity } from '../utils/Entity';
import useGroupStore from '../stores/useGroupStore';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const {addEntity} = useEnitityStore();
  const {groups, createGroup} = useGroupStore();

  return (
    <div className='absolute top-0 left-0 h-full shadow-2xl overflow-y-auto'>
      <div className={`bg-amber-100 h-full justify-center transition-all duration-300 ${open ? 'w-96' : 'w-12'} flex flex-col`}>
        <div
          className="self-end m-2 p-1 rounded cursor-pointer transition bg-white absolute top-[50%]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        >
          {open ? <BiChevronLeft size={24} /> : <BiChevronRight size={24} />}
        </div>
        {open && (
          <div className="p-4 w-[80%] mt-40 mb-40">
            {/* Sidebar content here */}
            {groups.map((group, n) => 
              <div className="w-full flex flex-col border-1 rounded-2xl p-5" key={n}>
                <div>Group {group.name ?? n+1}</div>

                <button className="bg-blue-500 text-white p-2 rounded mb-2"
                  onClick={() => addEntity({...new Entity(), color: 0x3214232})}> Add Blob
                </button>
              
                <button className="bg-blue-500 text-white p-4 rounded mb-2">
                  Rename
                </button>
              </div>
              

            )}

            {groups.length < 5 ? 
                <button onClick={() => createGroup()} className='align-middle justify-center w-[100%] bg-amber-50! m-2'>
                  New Group
                </button> : <></>}

          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar