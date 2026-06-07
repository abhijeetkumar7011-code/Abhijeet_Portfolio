import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";

export default function HomePage() {
  return (
    <main style={{ minHeight:"100vh", background:"var(--bg)", color:"var(--text)" }}>
      <MouseGlow />
      <Navbar />
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px" }}>
        <div id="home">
          <Hero />
        </div>
        <div style={{ marginTop:"24px" }} id="bento">
          <BentoGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}
