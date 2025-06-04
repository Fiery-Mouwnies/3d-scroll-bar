import React, {useRef, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Watch } from './Watch';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  return (
    <>
    {/*<OrbitControls
    /> */}

        <perspectiveCamera fov={45} near={.1} far={10000} makeDefault position={[0, 0, 10]} />
        <Environment preset='city' />
        <Watch/>
        <axesHelper args={[500]} />

    </>
  )
}

export default Scene