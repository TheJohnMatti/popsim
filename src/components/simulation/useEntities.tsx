import { useEffect } from 'react'
import * as THREE from 'three'
import useSceneStore from '../../stores/useSceneStore'
import { useEnitityStore } from '../../stores/useEntityStore'

type EntityObjectType = {
    geometry: THREE.CircleGeometry,
    material: THREE.MeshBasicMaterial,
    mesh: THREE.Mesh,
}

const useEntities = () => {
    const scene = useSceneStore((state) => state.scene)
    const { entities } = useEnitityStore()

    useEffect(() => {
        if (!scene) return
        const entityObjects: EntityObjectType[] = []

        entities.forEach((entity) => {
            // Use CircleGeometry for 2D circles
            const radius = entity.radius ?? 1
            const geometry = new THREE.CircleGeometry(radius, 32)
            // Optionally randomize color or use entity.color
            const color = entity.color ?? 0x0077ff
            const material = new THREE.MeshBasicMaterial({ color })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(entity.position.x, entity.position.y, 0)
            entityObjects.push({ geometry, material, mesh })
            scene.add(mesh)
        })

        // Cleanup
        return () => {
            entityObjects.forEach((entity) => {
                scene.remove(entity.mesh)
                entity.geometry.dispose()
                entity.material.dispose()
            })
        }
    }, [scene, entities])
}

export default useEntities