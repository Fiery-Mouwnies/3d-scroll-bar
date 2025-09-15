import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Energybar } from "./Energy-bar.tsx";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const modelRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // We use a gsap.context() for safe cleanup in React
    const ctx = gsap.context(() => {
      // Add a small delay to ensure everything, including the 3D model, is loaded
      // before GSAP tries to calculate dimensions.
      setTimeout(() => {
        if (modelRef.current && sectionRef.current) {
          
          console.log("Setting up GSAP. Refs are:", sectionRef.current, modelRef.current);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current, // Use the section as the trigger
              start: "top top",            // Start when the top of the section hits the top of the viewport
              end: "bottom bottom",        // End when the bottom of the section hits the bottom of the viewport
              scrub: 1,                    // Smooth scrubbing
              pin: true,                   // Pin the trigger element during the animation
              markers: true,               // <-- THIS IS THE DEBUGGER!
            },
          });

          // Define the animation sequence
          tl.fromTo(
            modelRef.current.rotation,
            { y: 0, x: 0, z: 0 },
            { y: Math.PI * 1.5, x: 0.2, z: -0.2, duration: 2 }
          )
          .to(modelRef.current.position, { y: 0.5, duration: 2 }, 0) // Animate at the same time as rotation
          .to(modelRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 2 }, 0); // Also at the same time
        } else {
          console.log("Refs not ready yet.");
        }
      }, 100); // 100ms delay

    }, sectionRef); // Scope the context to the main component

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
        
        {/* This section is now the trigger AND the pin target. 
            It needs a defined height, like h-screen, and a defined scroll length
            provided by the sections that come after it. */}
        <section ref={sectionRef} className="h-screen w-full relative">
            <div className="absolute top-[10%] w-full text-center z-10 pointer-events-none">
                <h1 className="text-white text-6xl md:text-8xl font-bold">Your Regular</h1>
                <h1 className="text-white text-6xl md:text-8xl font-bold">Protein Bar</h1>
            </div>

            <Canvas>
                <PerspectiveCamera fov={45} near={0.1} far={1000} makeDefault position={[0, 0, 25]} />
                <Environment preset="city" />
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
            </Canvas>
        </section>

        {/* These sections create the scrollable distance that drives the animation */}
        <section className="h-screen flex items-center justify-center">
          <p className="text-white w-full md:w-1/2 text-center px-4 text-4xl font-semibold">
            Packed with 20g of protein to fuel your adventure.
          </p>
        </section>

        <section className="h-screen flex items-center justify-center">
          <p className="text-white w-full md:w-1/2 text-center px-4 text-4xl font-semibold">
            Made with simple, high-quality ingredients you can trust.
          </p>
        </section>

        <section className="h-screen flex items-center justify-center">
          <p className="text-white w-full md:w-1/2 text-center px-4 text-4xl font-semibold">
            The perfect on-the-go snack, wherever life takes you.
          </p>
        </section>

      </Suspense>
    </div>
  );
}

export default App;