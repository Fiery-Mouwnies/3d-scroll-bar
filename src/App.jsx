import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

// Import BOTH components from the model file
import { Energybar, Instances } from "./Energy-bar.tsx";

// Register the GSAP plugin once
gsap.registerPlugin(ScrollTrigger);

function App() {
  const modelRef = useRef(null);
  const sectionRef = useRef(null);

  // useLayoutEffect is used to set up the animation after the component has rendered
  useLayoutEffect(() => {
    // gsap.context() is the modern, safe way to handle GSAP in React
    const ctx = gsap.context(() => {
      // Ensure both the trigger section and the 3D model are ready
      if (sectionRef.current && modelRef.current) {
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            markers: true, // Set to false for production
          },
        });

        // Add the animations
        tl.to(modelRef.current.rotation, { y: Math.PI * 1.5, x: 0.2, z: -0.2, ease: "none" }, 0)
          .to(modelRef.current.position, { y: 0.5, ease: "none" }, 0)
          .to(modelRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "none" }, 0);
      }
    }, sectionRef); // Scope the context to the main section

    // Cleanup function to revert all GSAP animations when the component unmounts
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
        
        <section ref={sectionRef} className="h-screen w-full relative">
          <div className="absolute top-[10%] w-full text-center z-10 pointer-events-none">
            <h1 className="text-white text-6xl md:text-8xl font-bold">Your Regular</h1>
            <h1 className="text-white text-6xl md:text-8xl font-bold">Protein Bar</h1>
          </div>
          
          <Canvas className="absolute inset-0 z-[5]">
            <PerspectiveCamera fov={45} near={0.1} far={1000} makeDefault position={[0, 0, 25]} />
            <Environment preset="city" />
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            
            {/* The Energybar component MUST be wrapped by the Instances component */}
            <Instances>
              <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
            </Instances>
          </Canvas>
        </section>

        {/* These sections create the scrollable area */}
        <section className="h-screen flex items-center justify-center">
          <p className="text-white text-center px-4 text-4xl font-semibold">
            Packed with 20g of protein to fuel your adventure.
          </p>
        </section>
        <section className="h-screen flex items-center justify-center">
          <p className="text-white text-center px-4 text-4xl font-semibold">
            Made with simple, high-quality ingredients you can trust.
          </p>
        </section>

      </Suspense>
    </div>
  );
}

export default App;