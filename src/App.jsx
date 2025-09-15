import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Energybar } from "./Energy-bar.tsx";

// Register the plugin once
gsap.registerPlugin(ScrollTrigger);

// --- HELPER COMPONENT ---
// This component's only job is to set up the animation.
// Because it's inside the Canvas, it will only run AFTER the 3D model is ready.
const ScrollAnimationSetup = ({ modelRef, sectionRef }) => {
  useLayoutEffect(() => {
    // Ensure all refs are available before proceeding
    if (modelRef.current && sectionRef.current) {
      
      console.log("SUCCESS: All refs are ready. Setting up ScrollTrigger.");

      // Create the GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // The entire section is the trigger
          start: "top top",
          end: "bottom bottom", // Animate over the full height of the section
          scrub: 1,
          pin: true, // Pin the trigger element
          markers: true, // Show debug markers
        },
      });

      // Add animations to the timeline, targeting the model's properties
      tl.to(modelRef.current.rotation, {
        y: Math.PI * 1.5,
        x: 0.2,
        z: -0.2,
        ease: "none",
      }, 0) // The '0' at the end means "start at the beginning of the timeline"
      .to(modelRef.current.position, {
        y: 0.5,
        ease: "none",
      }, 0)
      .to(modelRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        ease: "none",
      }, 0);
    }

    // GSAP's context handles cleanup automatically
  }, [modelRef, sectionRef]); // Re-run if refs change (though they shouldn't)

  return null; // This component renders nothing itself
};


// --- MAIN APP COMPONENT ---
function App() {
  const modelRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
        
        {/* This section provides the pinning and scrollable area */}
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
            
            {/* The 3D model, with its ref being assigned */}
            <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
            
            {/* The helper component that sets up the animation */}
            <ScrollAnimationSetup modelRef={modelRef} sectionRef={sectionRef} />
          </Canvas>
        </section>

        {/* These sections create the scroll distance needed to drive the animation */}
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