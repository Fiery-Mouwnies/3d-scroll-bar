import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Energybar } from "./Energy-bar.tsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const modelRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null); // <-- Ref for the title text

  // Use useLayoutEffect for animations to avoid "flicker"
  useLayoutEffect(() => {
    // A GSAP context allows for safe cleanup
    const ctx = gsap.context(() => {
      if (modelRef.current && sectionRef.current && textRef.current) {
        
        console.log("GSAP Refs are ready:", { 
            section: sectionRef.current, 
            model: modelRef.current,
            text: textRef.current 
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%", // Animate over a scroll distance of 200% of the viewport height
            scrub: 1,
            pin: true,
            markers: true, // Keep markers for debugging
          },
        });

        // --- TEST ANIMATION ---
        // Animate the opacity of the title text. If this works, ScrollTrigger is set up correctly.
        tl.to(textRef.current, {
          opacity: 0,
          y: -50, // Move it up slightly as it fades
          duration: 0.5
        });

        // --- 3D MODEL ANIMATION ---
        // This animation will happen after the text fades out.
        tl.to(modelRef.current.rotation, {
          y: Math.PI * 1.5,
          x: 0.2,
          z: -0.2,
          duration: 1.5
        }, ">-0.2"); // Overlap slightly with the end of the previous animation

        tl.to(modelRef.current.position, {
          y: 0.5,
          duration: 1.5
        }, "<"); // The "<" means "start at the same time as the previous animation"

        tl.to(modelRef.current.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 1.5
        }, "<");
      }
    }, sectionRef); // Scope context to the main section

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
        
        <section ref={sectionRef} className="h-screen w-full relative">
            <div ref={textRef} className="absolute top-[10%] w-full text-center z-10 pointer-events-none">
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

        {/* These sections create the scrollable distance */}
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
      </Suspense>
    </div>
  );
}

export default App;