import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col items-center md:flex-row md:justify-center gap-8 md:gap-12">
          <img
            src="/login-image.jpg"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                About{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  FightHub
                </span>

              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                At FightHub, we are passionate about combat sports and committed to building the ultimate network for fighters, coaches, and promoters. Whether you're a seasoned pro or just starting your journey, our platform connects you with opportunities, events, and a like-minded community that shares your dedication to K1, Muay Thai, and MMA.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
