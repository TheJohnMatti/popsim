import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import useSceneStore from '../../stores/useSceneStore'
import useOptionsStore from '../../stores/useOptionsStore'

const Scene = () => {

  const {zoom} = useOptionsStore();

  const mountRef = useRef<HTMLDivElement>(null)
  const scene = useSceneStore((state) => state.scene)
  const setScene = useSceneStore((state) => state.setScene)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

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


  const zoomBarSize = useMemo(() => {
    const x = zoom;
    if (Math.abs(x - 0.25) < 1E-2) return 0;
    if (Math.abs(x - 3) < 1E-2) return 1;
    return (x-0.25)/3;

  }, [zoom])


  return (
    <>
      <div className="w-[calc(100%-48px)] h-full ml-[48px]" ref={mountRef} />
      <div className="absolute bottom-6 right-6 bg-white bg-opacity-80 rounded px-4 py-2 shadow text-sm z-10 flex items-center min-w-[120px]">
        <span className="mr-2">Zoom</span>
        <div className="relative w-24 h-2 bg-gray-300 rounded">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
            style={{ width: `${(zoomBarSize) * 100}%`, minWidth: '8px' }}
          />
        </div>
        <span className="ml-2 w-8 text-right">{zoom.toFixed(2)}</span>
      </div>
    </>
  )
}

export default Scene;