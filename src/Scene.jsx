import React, {useRef, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  return (
    <>

        <perspectiveCamera makeDefault position={[0, 0, 10]} />

    </>
  )
}

export default Scene