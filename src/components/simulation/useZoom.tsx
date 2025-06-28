

import React, { useEffect } from 'react'
import useOptionsStore from '../../stores/useOptionsStore'

const useZoom = (el: HTMLElement | null) => {

    const {handleZoom: _handleZoom} = useOptionsStore();

    useEffect(() => {
        const handleZoom = (e: WheelEvent) => {
            _handleZoom(e.deltaY < 0 ? 'dec' : 'inc')
        }
        el?.addEventListener("wheel", handleZoom as ((e: Event) => void));

        return () => {
            el?.removeEventListener("wheel", handleZoom);
        }

    }, [el])
  
}

export default useZoom;