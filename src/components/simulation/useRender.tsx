import React, { useEffect } from 'react';
import { useEnitityStore } from '../../stores/useEntityStore';
import { FRAME_DURATION } from '../../utils';
import { discretePhysics } from '../../utils/Entity';

const useRender = () => {
  
    const {entities, updateEntity} = useEnitityStore();


    useEffect(() => {
        const frameLoop = () => {
            entities.forEach((entity) => updateEntity(discretePhysics(entity).id));
        }

        const interval = setInterval(() => {
            frameLoop();
        }, FRAME_DURATION);

        return () => {
            clearInterval(interval);
        }
    }, [updateEntity, entities, discretePhysics])

}

export default useRender;