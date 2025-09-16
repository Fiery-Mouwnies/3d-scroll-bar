import { useRef, useState, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Scene from "./Scene"; // We will create this component

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple timeline to track scroll progress
      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            // Update the state with the scroll progress (0 to 1)
            setScrollProgress(self.progress);
          },
        },
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    // The ref is on the main container which has all the sections
    <main ref={mainRef}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="canvas-container">
          <Canvas>
            {/* Pass the scroll progress into the scene */}
            <Scene scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* --- Sections for scrolling --- */}
        <section className="section">
          <h1>Your Regular Protein Bar</h1>
        </section>
        <section className="section">
          <h2>Packed with 20g of protein.</h2>
        </section>
        <section className="section">
          <h2>Made with simple ingredients.</h2>
        </section>
      </Suspense>
    </main>
  );
}

export default App;