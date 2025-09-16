import { useRef } from 'react';
import { useFrame } from '@react--three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar, Instances } from './Energy-bar'; 
import { gsap } from 'gsap';

// Camera positions remain the same
const cameraPositions = [
  [3.5, 2.17, 3.7],
  [3.7, 0.6, 0.7],
  [2.3, 0.87, -4.2],
  [0, 2.5, 3.6]
];

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();
  const modelRef = useRef(); // Add a ref for the model

  useFrame(() => {
    // Animate camera position based on scrollProgress
    // This logic can be adjusted later to match the video's multi-stage animation
    const currentSegment = Math.floor(scrollProgress * (cameraPositions.length - 1));
    const segmentProgress = (scrollProgress * (cameraPositions.length - 1)) % 1;

    const startPos = cameraPositions[currentSegment];
    const endPos = cameraPositions[currentSegment + 1] || cameraPositions[currentSegment];

    gsap.to(cameraRef.current.position, {
      x: gsap.utils.interpolate(startPos[0], endPos[0], segmentProgress),
      y: gsap.utils.interpolate(startPos[1], endPos[1], segmentProgress),
      z: gsap.utils.interpolate(startPos[2], endPos[2], segmentProgress),
      duration: 0.5,
    });
    
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={45} near={0.1} far={1000} />
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      <Instances>
        {/* --- THIS IS THE CORRECTED LINE --- */}
        <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
      </Instances>
    </>
  );
}