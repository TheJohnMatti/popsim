import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useSceneStore from '../../stores/useSceneStore'
import { useEnitityStore } from '../../stores/useEntityStore';

type EntityObjectType = {
    geometry: THREE.SphereGeometry,
    material: THREE.MeshStandardMaterial,
    sphere: THREE.Mesh,
}

const useEntities = () => {
    const scene = useSceneStore((state) => state.scene);
    const {entities} = useEnitityStore();

    useEffect(() => {
        console.log('Scene:', scene);

        if (!scene) return;
        const entityObjects: EntityObjectType[] = [];

        entities.forEach((entity, index) => {
            console.log('Entity:', entity);
            // Sphere (entity)
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(entity.position.x, entity.position.y, 0);
            const entityObject = {
                geometry,
                material,
                sphere,
            }
            entityObjects.push(entityObject);
            scene.add(entityObject.sphere)
            console.log('Entity added to scene:', entityObject.sphere);
        })

        // Cleanup function to remove the entity from the scene
        return () => {
            console.log('Cleaning up entities');
            entityObjects.forEach((entity) => {
                scene.remove(entity.sphere);
                entity.geometry.dispose()
                entity.material.dispose()
            })
        };
    }, [scene, entities]);
}

export default useEntities;