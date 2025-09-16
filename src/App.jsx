import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css"; // Make sure you have this CSS file
import { Energybar } from "./Energy-bar.tsx";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- HELPER COMPONENT ---
// This component now uses gsap.context() for safe and reliable animation setup and cleanup.
const ScrollAnimationSetup = ({ modelRef, sectionRef }) => {
  useLayoutEffect(() => {
    // gsap.context() is essential for React 18+ to prevent Strict Mode issues
    const ctx = gsap.context(() => {
      if (modelRef.current && sectionRef.current) {
        console.log("GSAP Context: Refs are ready. Setting up ScrollTrigger.");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            markers: true, // Keep markers on to debug, remove for production
          },
        });

        // Add animations to the timeline
        tl.to(modelRef.current.rotation, { y: Math.PI * 1.5, x: 0.2, z: -0.2, ease: "none" }, 0)
          .to(modelRef.current.position, { y: 0.5, ease: "none" }, 0)
          .to(modelRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "none" }, 0);
      }
    }, sectionRef); // Scope the context to the main section

    // Return a cleanup function that GSAP will call when the component unmounts
    return () => ctx.revert();
    
  }, [modelRef, sectionRef]);

  return null; // This component does not render anything visible
};


// --- MAIN APP COMPONENT ---
function App() {
  const modelRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading 3D Model...</div>}>
        
        {/* SECTION 1: The Pinned Section */}
        <section ref={sectionRef} className="h-screen w-full relative">
          
          {/* TOP LAYER: The heading text */}
          <div className="absolute top-[10%] w-full text-center z-10 pointer-events-none">
            <h1 className="text-white text-6xl md:text-8xl font-bold">Your Regular</h1>
            <h1 className="text-white text-6xl md:text-8xl font-bold">Protein Bar</h1>
          </div>
          
          {/* MIDDLE LAYER: The 3D Canvas */}
          <Canvas className="absolute inset-0 z-[5]">
            <PerspectiveCamera fov={45} near={0.1} far={1000} makeDefault position={[0, 0, 25]} />
            <Environment preset="city" />
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            
            <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
            
            <ScrollAnimationSetup modelRef={modelRef} sectionRef={sectionRef} />
          </Canvas>

        </section>

        {/* SECTION 2: Creates scroll distance */}
        <section className="h-screen flex items-center justify-center">
          <p className="text-white text-center px-4 text-4xl font-semibold">
            Packed with 20g of protein to fuel your adventure.
          </p>
        </section>
        
        {/* SECTION 3: Creates more scroll distance */}
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