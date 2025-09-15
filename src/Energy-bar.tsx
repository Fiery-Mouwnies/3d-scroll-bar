// Energy-bar.tsx

import * as THREE from 'three';
import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { GroupProps } from '@react-three/fiber'; // Import GroupProps

type GLTFResult = GLTF & {
  nodes: {
    pCube3_aiStandardSurface1_0: THREE.Mesh;
    pCube6_aiStandardSurface2_0: THREE.Mesh;
    // ... other nodes
    pCube329_aiStandardSurface3_0: THREE.Mesh;
  };
  materials: {
    aiStandardSurface1: THREE.MeshStandardMaterial;
    aiStandardSurface2: THREE.MeshStandardMaterial;
    aiStandardSurface3: THREE.MeshStandardMaterial;
  };
};

// --- IMPROVEMENT ---
// By adding `& GroupProps`, you get type safety for standard props 
// like `position`, `scale`, etc., that you pass from the App component.
export const Energybar = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('/granola_bar_3d.glb') as GLTFResult;
  
  return (
    // The ref is correctly assigned here. No errors.
    <group {...props} dispose={null} ref={ref}>
      <group rotation={[-0.0479383, 0.0251902, 0.1388813]}>
        <mesh
          geometry={nodes.pCube3_aiStandardSurface1_0.geometry}
          material={materials.aiStandardSurface1}
          scale={[20.6122513, 5.8417349, 3.5186796]}
        />
        {/* ... all other meshes ... */}
        <mesh
          geometry={nodes.pCube329_aiStandardSurface3_0.geometry}
          material={materials.aiStandardSurface3}
          position={[11.7951622, 3.5321004, -0.0007819]}
          rotation={[-1.5664596, 0.058433, 0.0003602]}
          scale={[0.7098053, 0.0144907, 0.034]}
        />
      </group>
    </group>
  );
});

useGLTF.preload('/granola_bar_3d.glb');