import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar } from './Energy-bar';
import { gsap } from 'gsap';

// Camera positions for each animation segment
const cameraPositions = [
  [3.5, 2.17, 8.0],   // Start (moved farther back)
  [3.7, 0.6, 6.0],    // To the side
  [2.3, 0.87, -6.0],  // To the back
  [0, 2.5, 8.0]       // To the front (Final)
];

const totalSegments = cameraPositions.length - 1;

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();

  useFrame(() => {
    const segmentIndex = Math.min(Math.floor(scrollProgress * totalSegments), totalSegments - 1);
    const segmentProgress = (scrollProgress * totalSegments) % 1;

    const startPos = cameraPositions[segmentIndex];
    const endPos = cameraPositions[segmentIndex + 1];

    if (startPos && endPos) {
      gsap.to(cameraRef.current.position, {
        x: gsap.utils.interpolate(startPos[0], endPos[0], segmentProgress),
        y: gsap.utils.interpolate(startPos[1], endPos[1], segmentProgress),
        z: gsap.utils.interpolate(startPos[2], endPos[2], segmentProgress),
        duration: 0.5,
      });
    }

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={45} near={0.1} far={1000} />
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      {/* Control the size and position here */}
      <Energybar scale={1.5} position={[0, -2, 0]} />
    </>
  );
}