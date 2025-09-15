import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Energybar } from "./Energy-bar.tsx";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const modelRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    // Ensure the refs are current
    if (modelRef.current && mainRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current, // The trigger is the main container
          start: "top top",         // Start the animation when the top of the trigger hits the top of the viewport
          end: "bottom bottom",     // End the animation when the bottom of the trigger hits the bottom of the viewport
          scrub: 1,                 // Smoothly link animation progress to scrollbar
        },
      });

      // Define the animation sequence
      // Note: We are animating the properties of the 3D model's group directly
      tl
        // Initial state (optional, but good for setting a starting point)
        .set(modelRef.current.rotation, { x: 0, y: Math.PI * 0.25, z: 0.2 })
        .set(modelRef.current.position, { x: 0, y: -1, z: 0 })
        
        // Sequence 1: Animate to the first text section
        .to(modelRef.current.rotation, {
            x: 0.5,
            y: -Math.PI * 0.5, // Rotate to show the side
            z: 0,
            duration: 2,
        }, 0) // The '0' here means this animation starts at the very beginning of the timeline
        .to(modelRef.current.position, {
            x: 2.5, // Move right
            y: 0,
            duration: 2,
        }, 0)
        
        // Sequence 2: Animate to the second text section
        .to(modelRef.current.rotation, {
            x: 0,
            y: Math.PI * 0.7, // Rotate again
            z: -0.2,
            duration: 2,
        }, 2) // Starts 2 seconds into the timeline
        .to(modelRef.current.position, {
            x: -2.5, // Move left
            y: 0.5,
            duration: 2,
        }, 2)

        // Sequence 3: Animate to the third text section
        .to(modelRef.current.rotation, {
            y: -Math.PI * 0.2,
            z: 0,
            duration: 2,
        }, 4) // Starts 4 seconds into the timeline
        .to(modelRef.current.position, {
            x: 0,
            y: 0,
            duration: 2,
        }, 4)
        .to(modelRef.current.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 2,
        }, 4);
    }
  }, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden bg-[#191919]">
      <Suspense fallback={ <div className="fixed inset-0 grid place-items-center bg-black text-white"> Loading... </div> } >
        {/* This is the main animation container that will be "pinned" */}
        <section className="relative h-[400vh]"> {/* The total scroll length for the animation */}
            <div className="sticky top-0 h-screen w-full"> {/* This div sticks to the top */}
                
                {/* HERO TEXT */}
                <div className="absolute top-[10%] w-full text-center">
                    <h1 className="text-white text-6xl md:text-8xl font-bold">Your Regular</h1>
                    <h1 className="text-white text-6xl md:text-8xl font-bold">Protein Bar</h1>
                </div>

                {/* 3D CANVAS */}
                <div className="h-full w-full">
                    <Canvas>
                        <PerspectiveCamera fov={45} near={0.1} far={1000} makeDefault position={[0, 0, 25]} />
                        <Environment preset="city" />
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 5]} intensity={2} />
                        <Energybar ref={modelRef} scale={1} />
                    </Canvas>
                </div>
            </div>
        </section>

        {/* --- Static Content Sections After the Animation --- */}
        <section className="relative flex items-center justify-center h-[100vh]">
          <p className="text-white w-full md:w-1/2 text-center px-4 text-4xl font-semibold">
            Packed with 20g of protein to fuel your adventure.
          </p>
        </section>

        <section className="relative flex items-center justify-center h-[100vh]">
          <p className="text-white w-full md:w-1/2 text-center px-4 text-4xl font-semibold">
            Made with simple, high-quality ingredients you can trust.
          </p>
        </section>

        <section className="relative flex items-center justify-center h-[100vh]">
          <p className="text-white w-full md:w-1/2 text-center px-4 text-4xl font-semibold">
            The perfect on-the-go snack, wherever life takes you.
          </p>
        </section>
      </Suspense>
    </main>
  );
}

export default App;