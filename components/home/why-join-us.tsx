import { JoinUsCarousel } from "./join-us-carousel";

export const WhyJoinUs = () => {
  return (
    <section id="joinus" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        Why{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Join{" "}
        </span>
        Us?
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Step into the ultimate combat sports community where fighters, coaches,
        and promoters come together. Whether you are looking to build your
        reputation, find fight opportunities, or connect with like-minded
        warriors, our platform is designed to take your career to the next
        level. Join a network that understands your passion, fuels your growth,
        and opens doors to new possibilities in K1, Muay Thai, and MMA. Your
        journey to greatness starts here!
      </p>
      <JoinUsCarousel />
    </section>
  );
};
