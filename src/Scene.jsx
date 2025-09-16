import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar, Instances } from './Energy-bar'; // Assuming Energy-bar.tsx is correct now
import { gsap } from 'gsap';

// Define the camera positions for each "stop" of the animation
const cameraPositions = [
  [3.5, 2.17, 3.7],  // Initial Position
  [3.7, 0.6, 0.7],   // Side View
  [2.3, 0.87, -4.2], // Back View
  [0, 2.5, 3.6]      // Front View (Final)
];

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();

  // This hook runs on every rendered frame
  useFrame(() => {
    // Animate camera position based on scrollProgress
    gsap.to(cameraRef.current.position, {
      x: gsap.utils.interpolate(cameraPositions[0][0], cameraPositions[1][0], scrollProgress),
      y: gsap.utils.interpolate(cameraPositions[0][1], cameraPositions[1][1], scrollProgress),
      z: gsap.utils.interpolate(cameraPositions[0][2], cameraPositions[1][2], scrollProgress),
      duration: 0.5, // Smooths the transition
    });

    // Make the camera always look at the center of the scene
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={45} near={0.1} far={1000} />
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

<Instances>
  <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
</Instances>
    </>
  );
}