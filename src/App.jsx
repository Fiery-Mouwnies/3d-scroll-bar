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
  const pinTargetRef = useRef(null);   // The element that will be pinned
  const scrollContainerRef = useRef(null); // The tall element that creates the scroll

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (modelRef.current && pinTargetRef.current && scrollContainerRef.current) {
        
        // This is our animation timeline
        const tl = gsap.timeline();
        
        // Add animations to the timeline
        tl.to(modelRef.current.rotation, { y: Math.PI * 1.5, x: 0.2, z: -0.2, ease: "none" })
          .to(modelRef.current.position, { y: 0.5, ease: "none" }, "<")
          .to(modelRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "none" }, "<");
          
        // Create the ScrollTrigger to control the timeline
        ScrollTrigger.create({
          trigger: scrollContainerRef.current, // The tall container is the trigger
          pin: pinTargetRef.current,           // Pin the sticky container
          start: "top top",
          end: "+=2000", // Animate over 2000 pixels of scroll
          scrub: 1,
          animation: tl, // Link the timeline to the scroll trigger
          markers: true, // Show debug markers
        });
      }
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-black text-white">Loading...</div>}>
      
      {/* This container's only job is to be tall and create a scrollbar */}
      <div ref={scrollContainerRef} className="bg-[#191919]">

        {/* This container will stick to the top and get pinned by GSAP */}
        <div ref={pinTargetRef} className="h-screen w-full sticky top-0">
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
        </div>
        
        {/* We add an empty div at the bottom to ensure the scroll container is tall enough */}
        <div style={{ height: '2000px' }}></div>

      </div>

    </Suspense>
  );
}

export default App;