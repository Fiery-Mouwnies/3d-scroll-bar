import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Energybar } from "./Energy-bar.tsx";

gsap.registerPlugin(ScrollTrigger);

// --- ScrollAnimationSetup component remains the same ---
const ScrollAnimationSetup = ({ modelRef, sectionRef }) => {
    // ... no changes needed here
};

// --- MAIN APP COMPONENT ---
function App() {
  const modelRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
        
        <section ref={sectionRef} className="h-screen w-full relative">
          
          {/* TOP LAYER: Text, already has z-10 */}
          <div className="absolute top-[10%] w-full text-center z-10 pointer-events-none">
            <h1 className="text-white text-6xl md:text-8xl font-bold">Your Regular</h1>
            <h1 className="text-white text-6xl md:text-8xl font-bold">Protein Bar</h1>
          </div>
          
          {/* --- FIX IS HERE --- */}
          {/* MIDDLE LAYER: Give the Canvas a z-index */}
          <Canvas
            // By making it absolute and setting inset-0, it fills the parent section.
            // The z-index places it above the other sections but below the text.
            className="absolute inset-0 z-[5]" 
          >
            <PerspectiveCamera fov={45} near={0.1} far={1000} makeDefault position={[0, 0, 25]} />
            <Environment preset="city" />
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            
            <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
            
            <ScrollAnimationSetup modelRef={modelRef} sectionRef={sectionRef} />
          </Canvas>

        </section>

        {/* BOTTOM LAYER: These sections will now scroll underneath the canvas */}
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