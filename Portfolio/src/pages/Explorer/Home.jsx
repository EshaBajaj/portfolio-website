import "./Home.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        await import(
          "https://unpkg.com/@lottiefiles/dotlottie-wc@0.7.1/dist/dotlottie-wc.js"
        );
      } catch (e) {
        console.error("Failed to load dotlottie-wc module:", e);
      }
      if (!canceled) setAnimation(true);
    })();
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <main className="explorer-page">
      <h2 className ="explorer-title" align="center">I am also Exploring!</h2>
      {animation ? (
        <dotlottie-wc
          src="https://lottie.host/3d469c8d-d46b-422d-8531-f748ccd893e3/W7E9IyVAec.lottie"
          speed="1"
          style={{ width: "500px", height: "500px", justifyContent: "center" }}
          mode="forward"
          loop
          autoplay
        ></dotlottie-wc>
      ) : (
        <div style={{ width: "500px", height: "500px", alignItems: "center" }}>
          Loading animation...
        </div>
      )}
    </main>
  );
}
