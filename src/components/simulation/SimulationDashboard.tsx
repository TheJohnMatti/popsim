import React, { useRef } from 'react'
import Entity from './useEntities'
import Scene from './Scene'
import useEntities from './useEntities';
import useRender from './useRender';
import useZoom from './useZoom';
import Data from '../data/Data';
import useWasm from '../../wasm/useWasm';

const SimulationDashboard = () => {

  useEntities();
  useRender();

  useWasm();

  return (
    <div className='w-full h-full grid' style={{gridTemplateColumns: '5fr 1fr'}}>
      <Scene />
      <Data />
    </div>
  )
}

export default SimulationDashboard;