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
  const modelRef = useRef();
  const animationSectionRef = useRef(); // <-- Ref for the section that will be pinned

  useEffect(() => {
    // We create a context for GSAP to scope the selectors
    const ctx = gsap.context(() => {
      if (modelRef.current && animationSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: animationSection-ref.current, // <-- TRIGGER on the section
            pin: true,                         // <-- PIN the section
            start: "top top",
            end: "bottom+=200% bottom",        // <-- Make the scroll longer
            scrub: 1,
          },
        });

        // Define the animation sequence for the model
        tl.to(modelRef.current.rotation, { y: Math.PI * 2, x: 0.5, z: -0.2 }, 0)
          .to(modelRef.current.position, { y: 0.5 }, 0)
          .to(modelRef.current.scale, { x: 1.2, y: 1.2, z: 1.2 }, 0);
      }
    }, animationSectionRef); // <-- Scope the context to our main ref

    return () => ctx.revert(); // <-- Cleanup GSAP animations on component unmount
  }, []);

  return (
    <div className="bg-[#191919]">
      <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
        
        {/* This section contains the animation and will be pinned */}
        <section ref={animationSectionRef} className="h-screen w-full relative">
          <div className="absolute top-[10%] w-full text-center z-10">
            <h1 className="text-white text-6xl md:text-8xl font-bold">Your Regular</h1>
            <h1 className="text-white text-6xl md:text-8xl font-bold">Protein Bar</h1>
          </div>

          <Canvas className="h-full w-full">
            <PerspectiveCamera fov={45} near={0.1} far={1000} makeDefault position={[0, 0, 25]} />
            <Environment preset="city" />
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Energybar ref={modelRef} scale={1} position={[0, -2, 0]} />
          </Canvas>
        </section>

        {/* --- Static Content Sections After the Animation --- */}
        {/* These sections now provide the scrollable length that drives the animation */}
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
    </div>
  );
}

export default App;