import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar, Instances } from './Energy-bar';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Define the camera and target positions for each animation segment
const positions = [
  { camera: new THREE.Vector3(0, 0, 8), target: new THREE.Vector3(0, -1.5, 0) },   // Start, looking straight at the bar
  { camera: new THREE.Vector3(-4, 0, 6), target: new THREE.Vector3(0, -1.5, 0) },  // Move left, keep looking at the bar
  { camera: new THREE.Vector3(-3, 0, -6), target: new THREE.Vector3(0, -1.5, 0) }, // Move to the back
  { camera: new THREE.Vector3(0, 0, 8), target: new THREE.Vector3(0, -1.5, 0) }    // Return to front
];

const totalSegments = positions.length - 1;

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();
  const targetRef = useRef(new THREE.Vector3(0, -1.5, 0)); // Initial target

  useFrame(() => {
    const segmentIndex = Math.min(Math.floor(scrollProgress * totalSegments), totalSegments - 1);
    const segmentProgress = (scrollProgress * totalSegments) % 1;

    const start = positions[segmentIndex];
    const end = positions[segmentIndex + 1];

    if (start && end) {
      // Interpolate camera position
      cameraRef.current.position.lerpVectors(start.camera, end.camera, segmentProgress);
      // Interpolate target position
      targetRef.current.lerpVectors(start.target, end.target, segmentProgress);
    }
    
    cameraRef.current.lookAt(targetRef.current);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={45} near={0.1} far={1000} />
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      <Instances>
        {/* You can now reliably control the scale and position here */}
        <Energybar scale={1.5} position={[0, -2, 0]} />
      </Instances>
    </>
  );
}```

---

#### **File 3: `src/App.css`** (No changes, but included for completeness)

```css
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #111111;
}
main { width: 100%; }
.canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
}
.section {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  color: white;
}
h1 { font-size: 4rem; font-weight: bold; }
h2 { font-size: 2.5rem; }
.loading-fallback {
    position: fixed; inset: 0; display: grid;
    place-items: center; background: #111; color: white;
}