import React, { useMemo, useContext, createContext, forwardRef } from 'react';
import { useGLTF, Merged } from '@react-three/drei';

const context = createContext();

export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/energy_bar_v2.glb');
  const instances = useMemo(() => {
      const result = {};
      for (const nodeName in nodes) {
          if(nodes[nodeName].isMesh) {
              result[nodes[nodeName].name] = nodes[nodeName];
          }
      }
      return result;
  }, [nodes]);

  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export const Energybar = forwardRef((props, ref) => {
  const instances = useContext(context);
  return (
    <group {...props} dispose={null} ref={ref}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="2e7513e960664aedaff860fe2491e0b6fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">
              <group name="group5">
                <group name="group4" rotation={[-0.048, 0.025, 0.139]}>
                  {/* Scale is removed from here to allow control from Scene.jsx */}
                  <group name="pCube3">
                    <instances.pCube3_aiStandardSurface1_0 />
                  </group>
                  <group name="group2">
                    {/* Add the full list of groups from your copied code here */}
                    <group name="pCube6" position={[-11.263, 4.109, -0.001]} rotation={[-1.574, 0.075, -0.003]} scale={[0.536, 0.022, 0.034]}><instances.pCube6_aiStandardSurface2_0/></group>
                    <group name="pCube329" position={[11.795, 3.532, -0.001]} rotation={[-1.566, 0.058, 0]} scale={[0.71, 0.014, 0.034]}><instances.pCube329_aiStandardSurface3_0/></group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload('/energy_bar_v2.glb');