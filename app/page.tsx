import { About } from "@/components/home/About";
import { Cta } from "@/components/home/Cta";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { WhyJoinUs } from "@/components/home/why-join-us";
import { Navbar } from "@/components/home/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { Pricing } from "@/components/home/Pricing";
import { ScrollToTop } from "@/components/home/ScrollToTop";
import { Services } from "@/components/home/Services";
import { Sponsors } from "@/components/home/Sponsors";
import { Team } from "@/components/home/Team";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-4">
        <Hero />
        {/* <Sponsors /> */}
        <About />
        <WhyJoinUs />
        <Features />
        {/* <Services /> */}
        {/* <Cta /> */}
        {/* <Testimonials /> */}
        <Team />
        {/* <Pricing /> */}
        <Newsletter />
        <FAQ />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
