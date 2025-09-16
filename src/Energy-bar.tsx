import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

// Note: This component assumes you have run the model through the online converter.
// It will not work with the original file that produces the "pbrSpecularGlossiness" error.

export const Energybar = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  // Make sure the path points to the NEW model in your /public folder
  const { nodes, materials } = useGLTF('/granola_bar_3d.glb');
  
  return (
    // By removing the internal scale, the scale prop passed from Scene.tsx will now work
    <group {...props} dispose={null} ref={ref}>
      <mesh
        // @ts-ignore
        geometry={nodes.pCube3_aiStandardSurface1_0.geometry}
        material={materials.aiStandardSurface1}
      />
      {/* Add other meshes from your model if there are any */}
    </group>
  );
});

useGLTF.preload('/granola_bar_3d.glb');