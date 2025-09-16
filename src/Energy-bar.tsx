import * as THREE from 'three';
import React, { useMemo, useContext, createContext, forwardRef } from 'react';
import { useGLTF, Merged } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { GroupProps } from '@react-three/fiber';

// Type definitions (can be very long, simplified here)
type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh };
  materials: { [key: string]: THREE.MeshStandardMaterial };
};

const context = createContext(null);

export function Instances({ children, ...props }) {
  // IMPORTANT: Use the new renamed file here
  const { nodes } = useGLTF('/energy_bar_v2.glb') as GLTFResult;
  const instances = useMemo(() => {
    const instances: { [key: string]: THREE.Mesh } = {};
    for (const key in nodes) {
        if (nodes[key].isMesh) {
            // A simplified way to create the mapping for all meshes
            instances[nodes[key].name] = nodes[key];
        }
    }
    return instances;
  }, [nodes]);

  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export const Energybar = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  const instances = useContext(context);
  return (
    <group {...props} dispose={null} ref={ref}>
        {/* The gltfjsx output might be complex. This is a robust way to render it all */}
        {Object.values(instances).map((instance: any) => (
            <group key={instance.uuid} name={instance.name} position={instance.position} rotation={instance.rotation} scale={instance.scale}>
                <mesh
                    geometry={instance.geometry}
                    material={instance.material}
                />
            </group>
        ))}
    </group>
  );
});

// IMPORTANT: Use the new renamed file here as well
useGLTF.preload('/energy_bar_v2.glb');