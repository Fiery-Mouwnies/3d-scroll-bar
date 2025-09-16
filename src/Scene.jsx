import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Energybar } from './Energy-bar';
import { gsap } from 'gsap';
import * as THREE from 'three';

const cameraPositions = [
  { camera: new THREE.Vector3(0, 0, 8), target: new THREE.Vector3(0, -1.5, 0) },
  { camera: new THREE.Vector3(-4, 0, 6), target: new THREE.Vector3(0, -1.5, 0) },
  { camera: new THREE.Vector3(-3, 0, -6), target: new THREE.Vector3(0, -1.5, 0) },
  { camera: new THREE.Vector3(0, 0, 8), target: new THREE.Vector3(0, -1.5, 0) }
];

const totalSegments = cameraPositions.length - 1;

export default function Scene({ scrollProgress }) {
  const cameraRef = useRef();
  const targetRef = useRef(new THREE.Vector3(0, -1.5, 0));

  useFrame(() => {
    if (!cameraRef.current) return;

    const segmentIndex = Math.min(Math.floor(scrollProgress * totalSegments), totalSegments - 1);
    const segmentProgress = (scrollProgress * totalSegments) % 1;

    const start = positions[segmentIndex];
    const end = positions[segmentIndex + 1];

    if (start && end) {
      cameraRef.current.position.lerpVectors(start.camera, end.camera, segmentProgress);
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
      <Energybar scale={1.5} position={[0, -2, 0]} />
    </>
  );
}