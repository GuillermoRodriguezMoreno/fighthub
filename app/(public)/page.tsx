import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { WhyJoinUs } from "@/components/home/why-join-us";
import { Navbar } from "@/components/home/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { ScrollToTop } from "@/components/home/ScrollToTop";
import { Team } from "@/components/home/Team";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-4">
        <Hero />
        <About />
        <WhyJoinUs />
        <Features />
        <Team />
        <Newsletter />
        <FAQ />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
