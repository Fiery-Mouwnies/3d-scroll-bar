import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'; // <-- TYPO IS FIXED HERE
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar, Instances } from './Energy-bar';
import { gsap } from 'gsap';

const cameraPositions = [
  [3.5, 2.17, 3.7],
  [3.7, 0.6, 0.7],
  [2.3, 0.87, -4.2],
  [0, 2.5, 3.6]
];

const totalSegments = cameraPositions.length - 1;

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();
  const modelRef = useRef();

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

      <Instances>
        {/* You can now adjust the scale and position here reliably */}
        <Energybar ref={modelRef} scale={1.5} position={[0, -2, 0]} />
      </Instances>
    </>
  );
}