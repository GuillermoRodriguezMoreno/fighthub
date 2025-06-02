import { AboutCarousel } from "./about-carousel";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col items-center lg:flex-row md:justify-center gap-8 lg:gap-12">
          <img
            src="/login-image.jpg"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <AboutCarousel />
        </div>
      </div>
    </section>
  );
};
