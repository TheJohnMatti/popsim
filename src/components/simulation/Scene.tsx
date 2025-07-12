import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import useSceneStore from '../../stores/useSceneStore'
import useOptionsStore from '../../stores/useOptionsStore'
import useZoom from './useZoom'
import Slider from '@mui/material/Slider';

const Scene = () => {
  const {zoom, setZoom } = useOptionsStore();
  const mountRef = useRef<HTMLDivElement>(null)
  const scene = useSceneStore((state) => state.scene)
  const setScene = useSceneStore((state) => state.setScene)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  useZoom(mountRef.current);

  // Create and store the scene if it doesn't exist
  useEffect(() => {
    if (!scene) {
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xdddddd)
      setScene(scene)
    }
  }, [scene, setScene])

  useEffect(() => {
    if (!scene || !mountRef.current) return

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    // Orthographic Camera for 2D look
    const aspect = width / height
    const viewSize = 30; // Adjust for your simulation scale
    cameraRef.current = new THREE.OrthographicCamera(
      (-aspect * viewSize) / 2, // left
      (aspect * viewSize) / 2,  // right
      viewSize / 2,             // top
      -viewSize / 2,            // bottom
      -100,                     // near
      100                       // far
    )
    cameraRef.current.position.set(0, 0, 10)
    cameraRef.current.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, cameraRef.current!)
    }
    animate()

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose();
    }
  }, [scene])

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.zoom = zoom;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoom]) 


  return (
    <div className="relative h-full ml-[48px]" ref={mountRef}>
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded px-4 py-2 shadow text-sm z-10 flex items-center min-w-[180px]">
        <span className="mr-2">Zoom</span>
        <Slider
          value={zoom}
          min={0.25}
          max={3}
          step={0.01}
          onChange={(_, value) => setZoom && setZoom(value)}
          sx={{ width: 100, mx: 2 }}
          size="small"
          aria-label="Zoom slider"
        />
        <span className="ml-2 w-8 text-right">{zoom.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default Scene;