import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar, Instances } from './Energy-bar';
import { gsap } from 'gsap';

// The camera positions for each animation segment
const cameraPositions = [
  [3.5, 2.17, 3.7],   // Start
  [3.7, 0.6, 0.7],    // To the side
  [2.3, 0.87, -4.2],  // To the back
  [0, 2.5, 3.6]       // To the front
];

// The total number of animation segments is one less than the number of positions
const totalSegments = cameraPositions.length - 1;

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();
  // --- FIX 1: Define the modelRef here ---
  const modelRef = useRef(); 

  useFrame(() => {
    // --- FIX 2: Improved animation logic for multiple stages ---

    // Determine which segment of the animation we are in (0, 1, or 2)
    const currentSegment = Math.floor(scrollProgress * totalSegments);
    
    // Ensure we don't go past the last segment
    const segmentIndex = Math.min(currentSegment, totalSegments - 1);

    // Calculate the progress (0 to 1) WITHIN the current segment
    const segmentProgress = (scrollProgress * totalSegments) % 1;

    // Get the start and end camera positions for the current segment
    const startPos = cameraPositions[segmentIndex];
    const endPos = cameraPositions[segmentIndex + 1];

    // Use GSAP to smoothly interpolate between the start and end positions
    if (startPos && endPos) {
      gsap.to(cameraRef.current.position, {
        x: gsap.utils.interpolate(startPos[0], endPos[0], segmentProgress),
        y: gsap.utils.interpolate(startPos[1], endPos[1], segmentProgress),
        z: gsap.utils.interpolate(startPos[2], endPos[2], segmentProgress),
        duration: 0.5, // Easing effect
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
        {/* This now works correctly with the defined ref */}
        <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
      </Instances>
    </>
  );
}