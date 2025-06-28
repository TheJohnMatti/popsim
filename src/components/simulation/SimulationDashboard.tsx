import React, { useRef } from 'react'
import Entity from './useEntities'
import Scene from './Scene'
import useEntities from './useEntities';
import useRender from './useRender';
import useZoom from './useZoom';

const SimulationDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEntities();
  useRender();
  useZoom(ref.current);
  return (
    <div className='w-full h-full' ref={ref}>
      <Scene />
    </div>
  )
}

export default SimulationDashboard