import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar, Instances } from './Energy-bar';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Define the camera and model target positions for each animation segment
const positions = [
  { camera: new THREE.Vector3(3.5, 2.17, 8.0), target: new THREE.Vector3(0, 0, 0) },
  { camera: new THREE.Vector3(3.7, 0.6, 7.0), target: new THREE.Vector3(2, 0, 0) },
  { camera: new THREE.Vector3(2.3, 0.87, -6.0), target: new THREE.Vector3(0, 0, -2) },
  { camera: new THREE.Vector3(0, 2.5, 8.0), target: new THREE.Vector3(0, 0, 0) }
];

const totalSegments = positions.length - 1;

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();
  const targetRef = useRef(new THREE.Vector3());

  useFrame(() => {
    const segmentIndex = Math.min(Math.floor(scrollProgress * totalSegments), totalSegments - 1);
    const segmentProgress = (scrollProgress * totalSegments) % 1;

    const start = positions[segmentIndex];
    const end = positions[segmentIndex + 1];

    if (start && end) {
      // Interpolate camera position
      gsap.to(cameraRef.current.position, {
        x: gsap.utils.interpolate(start.camera.x, end.camera.x, segmentProgress),
        y: gsap.utils.interpolate(start.camera.y, end.camera.y, segmentProgress),
        z: gsap.utils.interpolate(start.camera.z, end.camera.z, segmentProgress),
        duration: 0.5,
      });

      // Interpolate target position (what the camera looks at)
      gsap.to(targetRef.current, {
        x: gsap.utils.interpolate(start.target.x, end.target.x, segmentProgress),
        y: gsap.utils.interpolate(start.target.y, end.target.y, segmentProgress),
        z: gsap.utils.interpolate(start.target.z, end.target.z, segmentProgress),
        duration: 0.5,
      });
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
        <Energybar scale={1.5} position={[0, -2, 0]} />
      </Instances>
    </>
  );
}