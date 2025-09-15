import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  return (
    <>
      <PerspectiveCamera fov={45} near={.1} far={10000} makeDefault position={[0, 0, 10]} />
      <Environment preset="city" />
    </>
  )
}

export default Scene