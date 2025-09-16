import { useRef, useState, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
        <div className="canvas-container">
          <Canvas>
            <Scene scrollProgress={scrollProgress} />
          </Canvas>
        </div>

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