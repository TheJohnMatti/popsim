import React from 'react'
import Entity from './useEntities'
import Scene from './Scene'
import useEntities from './useEntities';

const SimulationDashboard = () => {
  useEntities();
  return (
    <div className='w-full h-full'>
      <Scene />
    </div>
  )
}

export default SimulationDashboard