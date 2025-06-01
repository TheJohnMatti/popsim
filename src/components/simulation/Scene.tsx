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

    // Camera, Renderer
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 10, 100)
    pointLight.position.set(1, 1, 1)
    scene.add(pointLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 5)
    scene.add(ambientLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
    //   sphere.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      scene.remove(pointLight)
      scene.remove(ambientLight)
      renderer.dispose()
    }
  }, [scene])

  return <div className="w-[calc(100%-48px)] h-full ml-[48px]" ref={mountRef} />
}

export default Scene;