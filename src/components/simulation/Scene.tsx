import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useSceneStore from '../../stores/useSceneStore'

const Scene = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const scene = useSceneStore((state) => state.scene)
  const setScene = useSceneStore((state) => state.setScene)

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
    const viewSize = 20 // Adjust for your simulation scale
    const camera = new THREE.OrthographicCamera(
      (-aspect * viewSize) / 2, // left
      (aspect * viewSize) / 2,  // right
      viewSize / 2,             // top
      -viewSize / 2,            // bottom
      -100,                     // near
      100                       // far
    )
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [scene])

  return <div className="w-[calc(100%-48px)] h-full ml-[48px]" ref={mountRef} />
}

export default Scene;